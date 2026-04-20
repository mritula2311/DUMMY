import MovieList from "../components/MovieList";
import { useAppContext } from "../context/AppContext";

function FavoritesPage() {
  const { state, deleteMovie, toggleFavorite, toggleWatched } = useAppContext();
  const favoriteMovies = state.movies.filter((movie) => state.favoriteIds.includes(movie.id));

  return (
    <section className="stack">
      <section className="panel">
        <h1>Favorites</h1>
        <p>Manage your favorite movies from global state.</p>
      </section>

      <MovieList
        movies={favoriteMovies}
        favoriteIds={state.favoriteIds}
        onDelete={deleteMovie}
        onToggleWatched={toggleWatched}
        onToggleFavorite={toggleFavorite}
        emptyMessage="No favorites selected yet."
      />
    </section>
  );
}

export default FavoritesPage;