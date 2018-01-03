import axios from 'axios'

export function fetchMovies(genre) {
  return {
    type: "FETCH_MOVIES",
    payload: axios.get(`https://yts.am/api/v2/list_movies.json?genre=${genre}&limit=2`)
  }
}
