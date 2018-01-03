export default function reducer(state={
  moviesList: [],
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
      const movies = action.payload.data.data.movies;

      let moviesNewList = []
      
      movies.map((movie) =>
        moviesNewList.push({
          "id": movie.id,
          "title": movie.title,
          "medium_cover_image": movie.medium_cover_image,
          "description_full": movie.description_full.substring(0,100),
          "yt_trailer_code": movie.yt_trailer_code
        })
      )

      return {
        ...state,
        fetching: false,
        fetched: true,
        moviesList: moviesNewList
      }
    default:
      return state
  }
}
