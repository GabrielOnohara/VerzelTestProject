import { Router } from 'express';
import axios from 'axios';
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

router.get('/:id', (req, res) => {
  res.status(200).send(`User with ID ${req.params.id}`);
});

export default router;