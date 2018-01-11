import { combineReducers } from 'redux'

import movies from './moviesReducer'
import movie from './movieReducer'

export default combineReducers({
  movies,
  movie
})
