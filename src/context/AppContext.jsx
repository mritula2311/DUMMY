import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from "react";
import { fetchPrivateData, fetchToken } from "../services/api";
import { ACTIONS, appReducer, initialState } from "../reducer/AppReducer";

const AppContext = createContext(null);

function normalizeMovies(payload) {
  const source = Array.isArray(payload)
    ? payload
    : Array.isArray(payload?.data)
      ? payload.data
      : Array.isArray(payload?.movies)
        ? payload.movies
        : [];

  return source
    .map((item, index) => {
      const id =
        item?.id ||
        item?._id ||
        item?.movieId ||
        `${item?.title || item?.name || "movie"}-${index}`;

      const title = (item?.title || item?.name || "Untitled").toString().trim();
      const year = item?.year?.toString().slice(0, 4) || "2000";
      const genre = (item?.genre || item?.category || "Unknown").toString().trim();
      const watched =
        typeof item?.watched === "boolean"
          ? item.watched
          : item?.status
            ? String(item.status).toLowerCase() === "watched"
            : false;

      return {
        id,
        title,
        year,
        genre,
        watched
      };
    })
    .filter((movie) => movie.title.length > 0);
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) {
      return;
    }

    fetchedRef.current = true;

    const studentId = (import.meta.env.VITE_STUDENT_ID || "").trim();
    const password = (import.meta.env.VITE_STUDENT_PASSWORD || "").trim();

    if (!studentId || !password) {
      dispatch({
        type: ACTIONS.FETCH_ERROR,
        payload: "Missing VITE_STUDENT_ID or VITE_STUDENT_PASSWORD in .env"
      });
      return;
    }

    const load = async () => {
      dispatch({ type: ACTIONS.FETCH_START });

      try {
        const tokenResponse = await fetchToken({ studentId, password });
        const token = tokenResponse?.token;

        if (!token) {
          throw new Error("Token not found in token response");
        }

        const dataResponse = await fetchPrivateData(token);
        const movies = normalizeMovies(dataResponse);

        dispatch({
          type: ACTIONS.FETCH_SUCCESS,
          payload: {
            token,
            movies
          }
        });
      } catch (error) {
        dispatch({
          type: ACTIONS.FETCH_ERROR,
          payload: error instanceof Error ? error.message : "Unknown error"
        });
      }
    };

    load();
  }, []);

  const value = useMemo(() => {
    const addMovie = (movie) => {
      dispatch({ type: ACTIONS.ADD_MOVIE, payload: movie });
    };

    const deleteMovie = (movieId) => {
      dispatch({ type: ACTIONS.DELETE_MOVIE, payload: movieId });
    };

    const toggleWatched = (movieId) => {
      dispatch({ type: ACTIONS.TOGGLE_WATCHED, payload: movieId });
    };

    const toggleFavorite = (movieId) => {
      dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: movieId });
    };

    const clearError = () => {
      dispatch({ type: ACTIONS.CLEAR_ERROR });
    };

    return {
      state,
      addMovie,
      deleteMovie,
      toggleWatched,
      toggleFavorite,
      clearError
    };
  }, [state]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppContext must be used inside AppProvider");
  }

  return context;
}