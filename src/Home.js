import React, { Component } from 'react';
import './Home.css';
import 'barecss';

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
      fetched: false
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
    if(!nextState.fetched) {
      this.fetchMovies();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(!prevState.fetched) {
      this.setState({
        fetched: true
      })
    }
  }

  fetchMovies() {
    const genre = this.state.genre;
    const rating = Number(this.state.rating);
    const limit = Number(this.state.limit) + 1;
    const rtr = this.state.RTRating;
    const sortBy = this.state.sortBy;
    const orderBy = this.state.orderBy;
    const url = `https://yts.am/api/v2/list_movies.json?genre=
    ${genre}&minimum_rating=${rating}&with_rt_ratings=${rtr}&limit=${limit}&sort_by=${sortBy}&order_by=${orderBy}`;

    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      this.setState({
        listMovies: data.data.movies,
      })
    }.bind(this));
  }

  cardMovies() {
    const listMovies = this.state.listMovies;
    const cards = [];
    if(listMovies && listMovies.length > 0) {
      for(let i=0; i < listMovies.length - 1; i++) {
        // console.log(listMovies[i]);
        let trailerLink = `https://www.youtube.com/watch?v=${listMovies[i].yt_trailer_code}`
        cards.push(
          <div col="2/12" key={listMovies[i].id}>
            <a tt="Click to Watch The Trailer" href={trailerLink} target="_blank">
              <card style={{minHeight: "550px", maxHeight: "550px", overflow: "hidden"}}>
                <img src={listMovies[i].medium_cover_image} alt="sign" />
                <h5>{listMovies[i].title}</h5>
                <hr/>
                <p>{listMovies[i].description_full.substring(0,100)} ...</p>
              </card>
            </a>
          </div>
        )
      }
      return cards;
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
                <input type="number" placeholder="The Minimum Rating" onChange={this.handleRating.bind(this)}/>
              </div>
              <div col="1/3">
                <input type="checkbox" id="RottenTomatoes" onChange={this.handleRTRating.bind(this)}/> <label htmlFor="RottenTomatoes">Include Rotten Tomatoes Rating ?</label>
              </div>
              <div col="1/3">
                <input type="number" min="1" max="50" placeholder="The Limit of Results" onChange={this.handleLimit.bind(this)}/>
              </div>
              <div col="1/3">
                <select onChange={this.handleSortBy.bind(this)}>
                	<option disabled>Sort by</option>
                	<option value="title">Title</option>
                	<option value="year">Year</option>
                	<option value="rating">Rating</option>
                </select>
              </div>
              <div col="1/3">
                <select onChange={this.handleOrderBy.bind(this)}>
                	<option disabled>Order by</option>
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
                  <option value="Film">Film</option> Noir
                  <option value="History">History</option>
                  <option value="Horror">Horror</option>
                  <option value="Music">Music</option>
                  <option value="Musical">Musical</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Romance">Romance</option>
                  <option value="Sci">Sci</option>-Fi
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
          {this.cardMovies()}
        </div>
      </div>
    );
  }
}

export default Home;
