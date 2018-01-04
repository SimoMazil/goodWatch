import axios from 'axios'

export function fetchMovies(genre, rating, limit, rtr, sortBy, orderBy) {
  const url = `https://yts.am/api/v2/list_movies.json?genre=
  ${genre}&minimum_rating=${rating}&with_rt_ratings=${rtr}&limit=${limit}&sort_by=${sortBy}&order_by=${orderBy}`;

  return {
    type: "FETCH_MOVIES",
    payload: axios.get(url)
  }
}
