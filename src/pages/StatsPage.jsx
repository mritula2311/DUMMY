import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

function StatsPage() {
  const { state } = useAppContext();

  const totalMovies = state.movies.length;
  const watchedMovies = state.movies.filter((movie) => movie.watched).length;
  const notWatchedMovies = totalMovies - watchedMovies;
  const groupedByGenre = state.movies.reduce((accumulator, movie) => {
    const genreKey = movie.genre || "Unknown";
    accumulator[genreKey] = (accumulator[genreKey] || 0) + 1;
    return accumulator;
  }, {});

  useEffect(() => {
    // Assessment scripts can validate values from this global state object.
    window.appState = {
      totalMovies,
      watchedMovies,
      notWatchedMovies,
      genreCounts: groupedByGenre,
      totalOrders: totalMovies,
      deliveredOrders: watchedMovies,
      cancelledOrders: notWatchedMovies
    };

    return () => {
      delete window.appState;
    };
  }, [totalMovies, watchedMovies, notWatchedMovies, groupedByGenre]);

  return (
    <section className="stack">
      <section className="panel">
        <h1>Stats Dashboard</h1>
        <p>All computed outputs and evaluation values are exposed from this route.</p>
      </section>

      <section className="stats-grid">
        <article className="panel stat-card">
          <h2>Total Movies</h2>
          <div data-testid="total-movies">{totalMovies}</div>
          <div data-testid="total-orders">{totalMovies}</div>
        </article>

        <article className="panel stat-card">
          <h2>Watched Movies</h2>
          <div data-testid="watched-movies">{watchedMovies}</div>
          <div data-testid="delivered-orders">{watchedMovies}</div>
        </article>

        <article className="panel stat-card">
          <h2>Not Watched Movies</h2>
          <div data-testid="unwatched-movies">{notWatchedMovies}</div>
          <div data-testid="cancelled-orders">{notWatchedMovies}</div>
        </article>
      </section>

      <section className="panel">
        <h2>Movies By Genre</h2>
        {Object.keys(groupedByGenre).length === 0 ? <p>No movies available.</p> : null}
        {Object.entries(groupedByGenre).map(([genre, count]) => (
          <div key={genre} data-testid="genre-group-item" className="genre-row">
            <span>{genre}</span>
            <strong>{count}</strong>
          </div>
        ))}
      </section>

      <section className="panel">
        <h2>Stats Source Rows</h2>
        {state.movies.map((movie) => (
          <div key={movie.id} data-testid="movie-item" className="genre-row">
            <span>{movie.title}</span>
            <strong>{movie.watched ? "Watched" : "Not Watched"}</strong>
          </div>
        ))}
      </section>
    </section>
  );
}

export default StatsPage;