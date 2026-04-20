import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import MovieCard from '../components/MovieCard.jsx';

const Favorites = () => {
  const { state } = useContext(AppContext);

  const favoriteMovies = useMemo(() => (
    state.movies.filter(movie => state.favorites.includes(movie.id))
  ), [state.movies, state.favorites]);

  return (
    <section>
      <h2>Favorites</h2>
      <p>Total Favorites: {favoriteMovies.length}</p>
      {favoriteMovies.length === 0 ? (
        <p>No favorites yet. Add some from the home page.</p>
      ) : (
        <div data-testid="favorites-list">
          {favoriteMovies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Favorites;
