import { useState } from "react";

const TITLE_REGEX = /^[A-Za-z\s]+$/;
const YEAR_REGEX = /^\d{4}$/;

function MovieForm({ onAddMovie }) {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const nextErrors = {};

    if (!TITLE_REGEX.test(title.trim())) {
      nextErrors.title = "Movie name must contain letters only";
    }

    if (!YEAR_REGEX.test(year.trim())) {
      nextErrors.year = "Year must be exactly 4 digits";
    }

    if (!genre.trim()) {
      nextErrors.genre = "Genre is required";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    onAddMovie({
      id: `${title.trim().toLowerCase().replace(/\s+/g, "-")}-${Date.now()}`,
      title: title.trim(),
      year: year.trim(),
      genre: genre.trim(),
      watched: false
    });

    setTitle("");
    setYear("");
    setGenre("");
    setErrors({});
  };

  return (
    <section className="panel">
      <h2>Add Movie</h2>
      <form onSubmit={handleSubmit} className="grid-form" noValidate>
        <label>
          Movie Name
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Interstellar"
          />
          {errors.title ? <small className="error-text">{errors.title}</small> : null}
        </label>

        <label>
          Year
          <input
            value={year}
            onChange={(event) => setYear(event.target.value)}
            type="text"
            placeholder="2024"
          />
          {errors.year ? <small className="error-text">{errors.year}</small> : null}
        </label>

        <label>
          Genre
          <input
            value={genre}
            onChange={(event) => setGenre(event.target.value)}
            type="text"
            placeholder="Sci-Fi"
          />
          {errors.genre ? <small className="error-text">{errors.genre}</small> : null}
        </label>

        <button type="submit" className="primary-btn">Add Movie</button>
      </form>
    </section>
  );
}

export default MovieForm;