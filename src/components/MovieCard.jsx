import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const MovieCard = ({ movie }) => {
  const { toggleWatched, deleteMovie, addFavorite, removeFavorite, state } = useContext(AppContext);
  const isFavorite = state.favorites.includes(movie.id);

  return (
    <article>
      <header>
        <h3>{movie.name}</h3>
        <span>{movie.year}</span>
      </header>
      <p>Genre: {movie.genre}</p>
      <div>
        <button
          type="button"
          onClick={() => toggleWatched(movie.id)}
          data-testid={`toggle-watched-${movie.id}`}
        >
          {movie.watched ? 'Watched' : 'Mark as Watched'}
        </button>
        <button
          type="button"
          onClick={() => (isFavorite ? removeFavorite(movie.id) : addFavorite(movie.id))}
          data-testid={`toggle-favorite-${movie.id}`}
        >
          {isFavorite ? 'Remove Favorite' : 'Add Favorite'}
        </button>
        <button
          type="button"
          onClick={() => deleteMovie(movie.id)}
          data-testid={`delete-movie-${movie.id}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
};

export default MovieCard;
