import MovieCard from "./MovieCard";

function MovieList({
  movies,
  favoriteIds,
  onDelete,
  onToggleWatched,
  onToggleFavorite,
  emptyMessage
}) {
  if (movies.length === 0) {
    return <p className="panel">{emptyMessage}</p>;
  }

  return (
    <section className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.includes(movie.id)}
          onDelete={onDelete}
          onToggleWatched={onToggleWatched}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default MovieList;