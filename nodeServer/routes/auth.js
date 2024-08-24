import { Router } from 'express';
import User from '../models/User.js';
import generateToken from '../jwt/jwt.js';

const router = Router();

router.post('/register', async (req, res) => {  
    const { username, email, password } = req.body;

    try {
      const user = new User({ username, email, password });
      await user.save();
  
      const token = generateToken(user);
  
      res.status(201).json({
        message: 'User created successfully',
        token
      });
    } catch (error) {
      res.status(400).json({ message: 'Error creating user', error: error.message });
    }
});

export default router;