import { Router } from 'express';
import jwt from 'jsonwebtoken';


import User from '../models/User.js';
import generateToken from '../jwt/jwt.js';

const router = Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ message: 'Email já esta em uso' });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: 'Username já está em uso' });
    }


    const user = new User({ username, email, password });
    await user.save();

    const token = generateToken(user);

    res.status(201).json({
      message: 'User created successfully',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar conta', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Senha incorreta!' });
    }

    const token = generateToken(user);
    res.status(200).json({
      message: 'Login feito com sucesso',
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login', error: error.message });
  }
})

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Supondo que o token vem no formato "Bearer token"

  if (token == null) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET || 'randomSecret', (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(403).json({ message: 'Token expirado' });
      } else {
        return res.status(403).json({ message: 'Token inválido' });
      }
    }

    req.user = user;
    next();
  });
};

router.get('/token', authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;

    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }
    
    const newToken = generateToken(user);
    res.status(200).json({
      message: 'Token renovado com sucesso',
      token: newToken
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao renovar token', error: error.message });
  }
});

export default router;
