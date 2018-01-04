import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/moviesActions'
import '../css/Home.css';
import 'barecss';

const stateMap = (store) => {
  return {
    moviesFetching: store.movies.fetching,
    moviesFetched: store.movies.fetched,
    moviesError: store.movies.error,
    moviesList: store.movies.moviesList
  };
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listMovies: [],
      genre: "",
      rating: "0",
      RTRating: false,
      limit: "20",
      sortBy: "date_added",
      orderBy: "desc",
      filtersMovie: "Show-Filters",
      arrow: "keyboard_arrow_down",
      fetched: null
    }
    this.handleGenre = this.handleGenre.bind(this)
    this.handleRating = this.handleRating.bind(this)
    this.handleRTRating = this.handleRTRating.bind(this)
    this.handleLimit = this.handleLimit.bind(this)
    this.hideFiltersMovie = this.hideFiltersMovie.bind(this)
  }

  handleGenre(e) {
    this.setState({
      genre: e.target.value,
      fetched: false
    })
  }

  handleRating(e) {
    this.setState({
      rating: e.target.value,
      fetched: false
    })
  }

  handleRTRating(e) {
    this.setState({
      RTRating: e.target.checked,
      fetched: false
    })
  }

  handleLimit(e) {
    this.setState({
      limit: e.target.value,
      fetched: false
    })
  }

  handleSortBy(e) {
    this.setState({
      sortBy: e.target.value,
      fetched: false
    })
  }

  handleOrderBy(e) {
    this.setState({
      orderBy: e.target.value,
      fetched: false
    })
  }

  componentWillUpdate(nextProps, nextState) {
    const genre = nextState.genre;
    const rating = Number(nextState.rating);
    const limit = Number(nextState.limit);
    const rtr = nextState.RTRating;
    const sortBy = nextState.sortBy;
    const orderBy = nextState.orderBy;

    if(nextState.fetched === false) {
      this.props.dispatch(fetchMovies(genre, rating, limit, rtr, sortBy, orderBy))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.fetched === false) {
      this.setState({
        fetched: true
      })
    }
  }

  filtersMovie() {
    return (
      <div className="Filters-Movie">
        <div col="1/1">
          <div col="11/12">
            <div className={this.state.filtersMovie} id="Filters">
              <div col="1/3">
                <input type="text" placeholder="Actor / Director Name"/>
              </div>
              <div col="1/3">
                <input type="number" min="1" max="50" placeholder="The Limit of Results" onChange={this.handleLimit.bind(this)}/>
              </div>
              <div col="1/3">
                <input type="number" placeholder="The Minimum Rating" onChange={this.handleRating.bind(this)}/>
              </div>
              <div col="1/3">
                <input type="checkbox" id="RottenTomatoes" onChange={this.handleRTRating.bind(this)}/> <label htmlFor="RottenTomatoes">Include Rotten Tomatoes Rating ?</label>
              </div>
              <div col="1/3">
                <select defaultValue="0" onChange={this.handleSortBy.bind(this)}>
                	<option value="0" disabled>Sort by</option>
                	<option value="title">Title</option>
                	<option value="year">Year</option>
                	<option value="rating">Rating</option>
                </select>
              </div>
              <div col="1/3">
                <select defaultValue="desc" onChange={this.handleOrderBy.bind(this)}>
                	<option value="desc">Desc</option>
                	<option value="asc">Asc</option>
                </select>
              </div>
            </div>
          </div>
          <div col="1/12">
            <button tt="Show / Hide Filters" style={{float: "right"}} onClick={this.hideFiltersMovie.bind(this)}><i className="material-icons">{this.state.arrow}</i></button>
          </div>
        </div>
      </div>
    )
  }

  hideFiltersMovie(e) {
    this.setState(prevState => ({
      filtersMovie: prevState.filtersMovie === "Hide-Filters" ? "Show-Filters" : "Hide-Filters",
      arrow: prevState.arrow === "keyboard_arrow_down" ? "keyboard_arrow_up" : "keyboard_arrow_down"
    }))
  }

  render() {
    const { moviesList, moviesFetched } = this.props;

    const mappedMovies = moviesFetched ? moviesList.map((movie) =>
      <div col="2/12" key={movie.id}>
        <a tt="Click to Watch The Trailer" href={"https://www.youtube.com/watch?v=movie"+movie.yt_trailer_code} target="_blank">
          <card style={{minHeight: "550px", maxHeight: "550px", overflow: "hidden"}}>
            <img src={movie.medium_cover_image} alt="sign" />
            <h5>{movie.title}</h5>
            <hr/>
            <p>{movie.description_full.substring(0,100)} ...</p>
          </card>
        </a>
      </div>
    ) : ""

    return (
      <div className="Home">
        <header className="Home-header">
          <h1 className="App-title">Welcome to Good Watch</h1>
            <div col="1/3">
              <select defaultValue="0" onChange={this.handleGenre.bind(this)}>
                <option value="0" disabled>Choose your favorite genre</option>
                  <option value="Action">Action</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Animation">Animation</option>
                  <option value="Biography">Biography</option>
                  <option value="Comedy">Comedy</option>
                  <option value="Crime">Crime</option>
                  <option value="Documentary">Documentary</option>
                  <option value="Drama">Drama</option>
                  <option value="Family">Family</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Film Noir">Film Noir</option>
                  <option value="History">History</option>
                  <option value="Horror">Horror</option>
                  <option value="Music">Music</option>
                  <option value="Musical">Musical</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Short">Short</option>
                  <option value="Sport">Sport</option>
                  <option value="Superhero">Superhero</option>
                  <option value="Thriller">Thriller</option>
                  <option value="War">War</option>
                  <option value="Western">Western</option>
              </select>
            </div>
        </header>
        <div col="1/1">
          {this.filtersMovie()}
        </div>
        <div col="1/1">
          <ul>{mappedMovies}</ul>
        </div>
      </div>
    );
  }
}

export default connect(stateMap)(Home);
