export default function reducer(state={
  movieDetails: {},
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case "FETCH_MOVIE_PENDING":
      return {...state, fetching: true}
    case "FETCH_MOVIE_REJECTED":
      return {...state, fetching: false, error: action.payload}
    case "FETCH_MOVIE_FULFILLED":
      let movieDetails = action.payload.data.data.movie;

      return {
        ...state,
        fetching: false,
        fetched: true,
        movieDetails: movieDetails
      }
    default:
      return state
  }
}
