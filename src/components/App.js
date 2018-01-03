import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/moviesActions'

// import Home from './Home'
import '../css/App.css';

const stateMap = (store) => {
  return {
    moviesFetching: store.movies.fetching,
    moviesFetched: store.movies.fetched,
    moviesError: store.movies.error,
    movies: store.movies.movies
  };
};
class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchMovies())
  }

  render() {
    const { movies } = this.props;
    const mappedMovies = movies.map((movie) => <li key={movie.id}>{movie.title}</li>)
    return (
      <div>
        <ul>{mappedMovies}</ul>
      </div>
    );
  }
}

export default connect(stateMap)(App);
