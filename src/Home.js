import React, { Component } from 'react';
import './Home.css';
import 'barecss';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listMovies: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    var that = this;
    var genre = e.target.value;
    var url = `https://yts.am/api/v2/list_movies.json?genre=${genre}`;

    fetch(url)
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      that.setState({
        listMovies: data.data.movies
      })
    });
  }

  cardMovies() {
    const listMovies = this.state.listMovies;
    const cards = [];
    if(listMovies.length > 0) {
      for(let i=0; i<20; i++) {
        console.log(listMovies[i]);
        cards.push(
          <div col="2/12" key={listMovies[i].id}>
            <card style={{minHeight: "550px", maxHeight: "550px", overflow: "hidden"}}>
              <img src={listMovies[i].medium_cover_image} alt="sign" />

              <h5>{listMovies[i].title}</h5>

              <p>{listMovies[i].description_full.substring(0,100)}</p>
            </card>
          </div>
        )
      }
      return cards;
    }
  }

  render() {
    return (
      <div className="Home">
        <header className="Home-header">
          <h1 className="App-title">Welcome to Good Watch</h1>
            <div col="1/3">
              <select defaultValue="0" onChange={this.handleChange.bind(this)}>
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
          {this.cardMovies()}
        </div>
      </div>
    );
  }
}

export default Home;
