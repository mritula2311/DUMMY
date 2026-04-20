import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import AddMovieForm from '../components/AddMovieForm.jsx';
import MovieCard from '../components/MovieCard.jsx';

const Home = () => {
  const { state } = useContext(AppContext);

  if (state.loading) {
    return <p>Loading movies...</p>;
  }

  if (state.error) {
    return <p role="alert">Error: {state.error}</p>;
  }

  return (
    <section>
      <h2>My Movies</h2>
      <AddMovieForm />
      {state.movies.length === 0 ? (
        <p>No movies yet. Add one to get started!</p>
      ) : (
        <div data-testid="movies-list">
          {state.movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
