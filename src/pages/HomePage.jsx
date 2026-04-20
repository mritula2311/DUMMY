import MovieForm from "../components/MovieForm";
import MovieList from "../components/MovieList";
import { useAppContext } from "../context/AppContext";

function HomePage() {
  const { state, addMovie, deleteMovie, toggleFavorite, toggleWatched, clearError } = useAppContext();

  return (
    <section className="stack">
      {state.error ? (
        <div className="error-banner" role="alert">
          <span>{state.error}</span>
          <button type="button" onClick={clearError}>Dismiss</button>
        </div>
      ) : null}

      <MovieForm onAddMovie={addMovie} />

      <section className="panel">
        <h2>All Movies</h2>
        {state.loading ? <p>Loading movies from API...</p> : null}
        <MovieList
          movies={state.movies}
          favoriteIds={state.favoriteIds}
          onDelete={deleteMovie}
          onToggleWatched={toggleWatched}
          onToggleFavorite={toggleFavorite}
          emptyMessage="No movies found. Add one using the form above."
        />
      </section>
    </section>
  );
}

export default HomePage;