export const initialState = {
  token: null,
  movies: [],
  favorites: [],
  loading: false,
  error: null
};

export const AppReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_FETCH':
      return {
        ...state,
        loading: true,
        error: null
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        error: null,
        token: action.payload.token,
        movies: action.payload.movies
      };
    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [action.payload, ...state.movies]
      };
    case 'DELETE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter(movie => movie.id !== action.payload),
        favorites: state.favorites.filter(id => id !== action.payload)
      };
    case 'TOGGLE_WATCHED':
      return {
        ...state,
        movies: state.movies.map(movie => (
          movie.id === action.payload
            ? { ...movie, watched: !movie.watched }
            : movie
        ))
      };
    case 'ADD_FAVORITE':
      if (state.favorites.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case 'REMOVE_FAVORITE':
      return {
        ...state,
        favorites: state.favorites.filter(id => id !== action.payload)
      };
    default:
      return state;
  }
};
