import axios from 'axios'

export function fetchMovies(genre, movieName, rating, limit, rtr, sortBy, orderBy) {
  const url = `https://yts.am/api/v2/list_movies.json?genre=
  ${genre}&query_term=${movieName}&minimum_rating=${rating}&with_rt_ratings=${rtr}&limit=${limit}&sort_by=${sortBy}&order_by=${orderBy}`;

  return {
    type: "FETCH_MOVIES",
    payload: axios.get(url)
  }
}

export function fetchMovieDetails(movieId) {
  const url = `https://yts.am/api/v2/movie_details.json?movie_id=${movieId}`;

  return {
    type: "FETCH_MOVIE",
    payload: axios.get(url)
  }
}
