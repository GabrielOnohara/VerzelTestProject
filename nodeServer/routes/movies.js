import { Router } from 'express';
import axios from 'axios';

import {addFavorite} from '../models/Movie.js'
import User from '../models/User.js';
import {authenticateToken} from '../jwt/jwt.js'
const router = Router();

router.get('/', async (req, res) => {  
  try {
    const response = await axios.get(
      process.env.TMDB_URL+`movies/550`+`?api_key=${process.env.TMDB_TOKEN}`
    )
    const data = response.data
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error})
  }
});

const getMovieData = async (type, page) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_URL}/movie/${type}?language=en-US&page=${page}&api_key=${process.env.TMDB_TOKEN}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

const searchMovieData = async (query, page) => {
  try {
    const response = await axios.get(
      `${process.env.TMDB_URL}/search/movie?query=${query}&page=${page}language=en-US&api_key=${process.env.TMDB_TOKEN}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

router.get('/popular', authenticateToken, async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('popular', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/upcoming', authenticateToken, async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('upcoming', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/top_rated', authenticateToken, async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('top_rated', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/now_playing', authenticateToken, async (req, res) => {
  const page = req.query.page || 1;
  try {
    const data = await getMovieData('now_playing', page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', authenticateToken, async (req, res) => {
  const page = req.query.page || 1;
  const query = req.query.query || '';
  try {
    const data = await searchMovieData(query, page);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const user = await User.findById(id).populate('favorites')
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }
  
    res.status(200).json({ favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/favorites', authenticateToken, async (req, res) => {
  try {
    const { id } = req.user;
    const favoriteData = req.body
    const user = await User.findById(id).populate('favorites')
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }
    
    if(addFavorite(user._id, favoriteData)){
      return res.status(200).json({ success: true });
    } else {
      return res.status(400).json({ success: false});
    }


  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/favorites/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.user; 
    const movieId = req.params.id;
    
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: 'Usuário não encontrado!' });
    }

    await User.findByIdAndUpdate(
      id,
      { $pull: { favorites: movieId } },
      { new: true }
    );
    
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/:id', (req, res) => {
  res.status(200).send(`User with ID ${req.params.id}`);
});

export default router;