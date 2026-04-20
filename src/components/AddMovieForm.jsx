import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';

const AddMovieForm = () => {
  const { addMovie } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    genre: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Movie name is required.';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      newErrors.name = 'Movie name must contain only letters and spaces.';
    }

    if (!formData.year.trim()) {
      newErrors.year = 'Year is required.';
    } else if (!/^\d{4}$/.test(formData.year)) {
      newErrors.year = 'Year must be exactly 4 digits.';
    }

    if (!formData.genre.trim()) {
      newErrors.genre = 'Genre is required.';
    }

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addMovie({
      id: Date.now(),
      name: formData.name.trim(),
      year: parseInt(formData.year, 10),
      genre: formData.genre.trim(),
      watched: false
    });

    setFormData({
      name: '',
      year: '',
      genre: ''
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Movie</h2>
      <div>
        <label htmlFor="name">Movie Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          data-testid="input-movie-name"
        />
        {errors.name && <p role="alert">{errors.name}</p>}
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <input
          id="year"
          name="year"
          type="text"
          value={formData.year}
          onChange={handleChange}
          maxLength={4}
          data-testid="input-movie-year"
        />
        {errors.year && <p role="alert">{errors.year}</p>}
      </div>
      <div>
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          name="genre"
          type="text"
          value={formData.genre}
          onChange={handleChange}
          data-testid="input-movie-genre"
        />
        {errors.genre && <p role="alert">{errors.genre}</p>}
      </div>
      <button type="submit" data-testid="btn-add-movie">Add Movie</button>
    </form>
  );
};

export default AddMovieForm;
