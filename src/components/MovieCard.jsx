function MovieCard({ movie, isFavorite, onDelete, onToggleWatched, onToggleFavorite }) {
  return (
    <article className="movie-card" data-testid="movie-card">
      <h3>{movie.title}</h3>
      <p>{movie.genre} | {movie.year}</p>
      <p>
        Status: <strong>{movie.watched ? "Watched" : "Not Watched"}</strong>
      </p>

      <div className="card-actions">
        <button type="button" onClick={() => onToggleWatched(movie.id)}>
          {movie.watched ? "Mark Unwatched" : "Mark Watched"}
        </button>
        <button type="button" onClick={() => onToggleFavorite(movie.id)}>
          {isFavorite ? "Remove Favorite" : "Add Favorite"}
        </button>
        <button type="button" onClick={() => onDelete(movie.id)} className="danger-btn">
          Delete
        </button>
      </div>
    </article>
  );
}

export default MovieCard;