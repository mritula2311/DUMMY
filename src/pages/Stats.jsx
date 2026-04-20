import React, { useContext, useEffect, useMemo } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const Stats = () => {
  const { state } = useContext(AppContext);

  const stats = useMemo(() => {
    const totalMovies = state.movies.length;
    const watchedMovies = state.movies.filter(movie => movie.watched);
    const totalWatched = watchedMovies.length;
    const unwatchedMovies = state.movies.filter(movie => !movie.watched);
    const totalUnwatched = unwatchedMovies.length;

    const moviesByGenre = state.movies.reduce((acc, movie) => {
      const genre = movie.genre || 'Unknown';
      if (!acc[genre]) {
        acc[genre] = [];
      }
      acc[genre].push(movie);
      return acc;
    }, {});

    return {
      totalMovies,
      totalWatched,
      totalUnwatched,
      moviesByGenre
    };
  }, [state.movies]);

  useEffect(() => {
    window.appState = {
      totalMovies: stats.totalMovies,
      watchedMovies: stats.totalWatched,
      unwatchedMovies: stats.totalUnwatched,
      moviesByGenre: stats.moviesByGenre
    };
  }, [stats]);

  const genreEntries = Object.entries(stats.moviesByGenre);

  return (
    <section>
      <h2>Stats Dashboard</h2>
      <ul>
        <li data-testid="total-movies">Total Movies: {stats.totalMovies}</li>
        <li data-testid="watched-movies">Watched Movies: {stats.totalWatched}</li>
        <li data-testid="unwatched-movies">Unwatched Movies: {stats.totalUnwatched}</li>
      </ul>
      <div data-testid="movies-by-genre">
        <h3>Movies by Genre</h3>
        {genreEntries.length === 0 ? (
          <p>No movies added yet.</p>
        ) : (
          <ul>
            {genreEntries.map(([genre, movies]) => (
              <li key={genre} data-testid={`genre-${genre}`}>
                {genre}: {movies.length}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default Stats;
