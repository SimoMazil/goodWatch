import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMovieDetails } from '../actions/moviesActions'

import card from 'barecss';

const stateMap = (store) => {
  return {
    movieFetching: store.movie.fetching,
    movieFetched: store.movie.fetched,
    movieError: store.movie.error,
    movieDetails: store.movie.movieDetails
  };
};

class Details extends Component {
  componentWillMount(props) {
    const movieId = this.props.match.params.id
    this.props.dispatch(fetchMovieDetails(movieId))
  }

  render() {
    return (
      <h1>Details</h1>
    );
  }
}

export default connect(stateMap)(Details);
