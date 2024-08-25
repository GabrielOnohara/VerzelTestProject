import { Router } from 'express';
import axios from 'axios';

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

router.get('/popular', async (req, res) => {  
  try {
    const response = await axios.get(
      process.env.TMDB_URL + `/movie/popular?language=pt-BR&page=1`+`&api_key=${process.env.TMDB_TOKEN}`
    )
    const data = response.data
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error})
  }
});

router.get('/upcoming', async (req, res) => {  
  try {
    const response = await axios.get(
      process.env.TMDB_URL + `/movie/upcoming?language=pt-BR&page=1`+`&api_key=${process.env.TMDB_TOKEN}`
    )
    const data = response.data
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error})
  }
});

router.get('/top_rated', async (req, res) => {  
  try {
    const response = await axios.get(
      process.env.TMDB_URL + `/movie/top_rated?language=pt-BR&page=1`+`&api_key=${process.env.TMDB_TOKEN}`
    )
    const data = response.data
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error})
  }
});


router.get('/now_playing', async (req, res) => {  
  try {
    const response = await axios.get(
      process.env.TMDB_URL + `/movie/now_playing?language=pt-BR&page=1`+`&api_key=${process.env.TMDB_TOKEN}`
    )
    const data = response.data
    res.json(data)
  } catch (error) {
    res.status(500).json({message: error})
  }
});

router.get('/:id', (req, res) => {
  res.status(200).send(`User with ID ${req.params.id}`);
});

export default router;