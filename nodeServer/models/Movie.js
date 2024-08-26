import mongoose from 'mongoose';

const moviesSchema = new mongoose.Schema({
  adult: { type: Boolean, default: false },
  backdrop_path: { type: String },
  genre_ids: [{ type: Number }],
  id: { type: Number, unique: true },
  original_language: { type: String },
  original_title: { type: String },
  overview: { type: String },
  popularity: { type: Number },
  poster_path: { type: String },
  release_date: { type: Date },
  title: { type: String },
  video: { type: Boolean, default: false },
  vote_average: { type: Number },
  vote_count: { type: Number }
});

const Movie = mongoose.model('Movie', moviesSchema);

import User from './User.js';

export async function addFavorite(userId, movieData) {
  try {
    let movie = await Movie.findOne({ id: movieData.id });
    
    if (!movie) {
      movie = new Movie(movieData);
      await movie.save();
    }

    await User.findByIdAndUpdate(
      userId,
      { $addToSet: { favorites: movie._id } },
      { new: true }
    );

    const updatedUser = await User.findById(userId).populate('favorites');
    
    return { success: true, favorites: updatedUser.favorites };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
export default Movie;