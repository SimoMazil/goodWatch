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
    moviesList: store.movies.moviesList
  };
};
class App extends Component {
  componentWillMount() {
    this.props.dispatch(fetchMovies("Comedy"))
  }

  render() {
    const { moviesList } = this.props;
    const mappedMovies = moviesList.map((movie) => <li key={movie.id}>{movie.title}</li>)
    return (
      <div>
        <ul>{mappedMovies}</ul>
      </div>
    );
  }
}

export default connect(stateMap)(App);
