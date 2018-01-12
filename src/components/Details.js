import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchMovieDetails } from '../actions/moviesActions'

import '../css/styles.css';
import 'barecss';

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

    const { movieFetching, movieFetched, movieError, movieDetails } = this.props;

    const trailer = `https://www.youtube.com/embed/${movieDetails.yt_trailer_code}`;

    return (
      <div className="Details">
        <header className="header" style={{backgroundImage: `url(${movieDetails.background_image})`, backgroundSize: "cover"}}>
          <h1 className="header-title">{movieDetails.title}</h1>
          <img src={movieDetails.medium_cover_image} />
        </header>
        <div col="1/2">
          <h3>Description</h3>
          <p>{movieDetails.description_full}</p>
        </div>
        <div col="1/1">
          <iframe width="560" height="315" src={trailer} frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
        </div>
        <div col="1/1">
          <button tt="Watch Trailer"><i className="material-icons">play_arrow</i></button>
          <button tt="Share"><i className="material-icons">share</i></button>
          <button tt="Download Torrent"><i className="material-icons">file_download</i></button>
        </div>
      </div>
    );
  }
}

export default connect(stateMap)(Details);
