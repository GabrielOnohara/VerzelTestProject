import { Router } from 'express';
import axios from 'axios';

const router = Router();

router.get('/', async (req, res) => {  
  try {
    const response = await axios.get(process.env.TMDB_URL+`movie/550`+`?api_key=${process.env.TMDB_TOKEN}`)
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