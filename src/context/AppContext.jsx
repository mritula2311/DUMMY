import React, { createContext, useEffect, useReducer } from 'react';
import { AppReducer, initialState } from '../reducer/AppReducer.js';
import { fetchToken, fetchDataset } from '../services/api.js';

export const AppContext = createContext(null);

const normalizeMovies = (payload) => {
  const rawMovies = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.movies)
        ? payload.movies
        : null;

  if (!rawMovies) {
    throw new Error('Dataset format not recognized. Expected an array of movies.');
  }

  return rawMovies.map((movie, index) => {
    const parsedYear = Number.isFinite(movie.year)
      ? movie.year
      : parseInt(movie.year, 10);

    return {
      id: movie.id ?? movie.movieId ?? movie._id ?? `${Date.now()}-${index}`,
      name: movie.name ?? movie.title ?? 'Untitled',
      year: Number.isNaN(parsedYear) ? new Date().getFullYear() : parsedYear,
      genre: movie.genre ?? movie.category ?? 'Unknown',
      watched: Boolean(movie.watched)
    };
  });
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, {
    ...initialState,
    loading: true
  });

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      dispatch({ type: 'INIT_FETCH' });
      try {
        const token = await fetchToken();
        const dataset = await fetchDataset(token);
        const movies = normalizeMovies(dataset);

        if (isMounted) {
          dispatch({ type: 'FETCH_SUCCESS', payload: { token, movies } });
        }
      } catch (error) {
        if (isMounted) {
          dispatch({
            type: 'FETCH_ERROR',
            payload: error?.message ?? 'Failed to load data.'
          });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const addMovie = (movie) => dispatch({ type: 'ADD_MOVIE', payload: movie });
  const deleteMovie = (id) => dispatch({ type: 'DELETE_MOVIE', payload: id });
  const toggleWatched = (id) => dispatch({ type: 'TOGGLE_WATCHED', payload: id });
  const addFavorite = (id) => dispatch({ type: 'ADD_FAVORITE', payload: id });
  const removeFavorite = (id) => dispatch({ type: 'REMOVE_FAVORITE', payload: id });

  return (
    <AppContext.Provider
      value={{
        state,
        addMovie,
        deleteMovie,
        toggleWatched,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
