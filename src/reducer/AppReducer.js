export const initialState = {
  token: null,
  movies: [],
  favoriteIds: [],
  loading: false,
  error: null
};

export const ACTIONS = {
  FETCH_START: "FETCH_START",
  FETCH_SUCCESS: "FETCH_SUCCESS",
  FETCH_ERROR: "FETCH_ERROR",
  ADD_MOVIE: "ADD_MOVIE",
  DELETE_MOVIE: "DELETE_MOVIE",
  TOGGLE_WATCHED: "TOGGLE_WATCHED",
  TOGGLE_FAVORITE: "TOGGLE_FAVORITE",
  CLEAR_ERROR: "CLEAR_ERROR"
};

function dedupeById(items) {
  const map = new Map();
  items.forEach((item) => {
    map.set(item.id, item);
  });
  return [...map.values()];
}

export function appReducer(state, action) {
  switch (action.type) {
    case ACTIONS.FETCH_START:
      return {
        ...state,
        loading: true,
        error: null
      };

    case ACTIONS.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        movies: dedupeById(action.payload.movies)
      };

    case ACTIONS.FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    case ACTIONS.ADD_MOVIE:
      return {
        ...state,
        movies: [action.payload, ...state.movies]
      };

    case ACTIONS.DELETE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.payload),
        favoriteIds: state.favoriteIds.filter((id) => id !== action.payload)
      };

    case ACTIONS.TOGGLE_WATCHED:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.id === action.payload
            ? {
                ...movie,
                watched: !movie.watched
              }
            : movie
        )
      };

    case ACTIONS.TOGGLE_FAVORITE:
      return state.favoriteIds.includes(action.payload)
        ? {
            ...state,
            favoriteIds: state.favoriteIds.filter((id) => id !== action.payload)
          }
        : {
            ...state,
            favoriteIds: [...state.favoriteIds, action.payload]
          };

    case ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };

    default:
      return state;
  }
}