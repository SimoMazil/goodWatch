export default function reducer(state={
  movies: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch (action.type) {
    case "FETCH_MOVIES_PENDING":
      return {...state, fetching: true}
    case "FETCH_MOVIES_REJECTED":
      return {...state, fetching: false, error: action.payload}
    case "FETCH_MOVIES_FULFILLED":
      return {
        ...state,
        fetching: false,
        fetched: true,
        movies: action.payload.data.data.movies
      }
    default:
      return state
  }
}
