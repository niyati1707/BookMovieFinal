import React from "react";
import Home from './../home/Home';
import Details from './../details/Details';
import BookShow from './../bookshow/BookShow';
import Confirmation from './../confirmation/Confirmation';

import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

class Controller extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      error: '',
      movies: [],
      genres: [],
      artists: []
    };
  }

  shouldComponentUpdate(nextState) {
    return this.state !== nextState;
  }

  componentDidMount() {

    //get movies
    fetch('http://localhost:8085/api/v1/movies?page=1&limit=20')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            movies: result.movies
          });
        },
        (error) => {
          this.setState({
            error: error
          });
        }
      )

    //get genres

    fetch('http://localhost:8085/api/v1/genres')
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            genres: result.genres
          });
        },
        (error) => {
          this.setState({
            error: error
          });
        }
      )

    //get artists

    fetch('http://localhost:8085/api/v1/artists?page=1&limit=10')
      .then(res => res.json())
      .then(
        (result) => {
          console.log("result", result.artists)
          this.setState({
            artists: result.artists
          });
        },
        (error) => {
          this.setState({
            error: error
          });
        }
      )
  }
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route exact path='/' render={
            (props) => <Home moviesData={this.state.movies}
              genresData={this.state.genres}
              artistsData={this.state.artists} />
          } />

          <Route path='/details' render={
            (props) => <Details{...props}></Details>
          } />

          <Route exact path='/bookShow' render={
            (props) => <BookShow{...props}></BookShow>
          } />

          <Route exact path='/confirm' render={
            (props) => <Confirmation{...props}></Confirmation>
          } />



        </React.Fragment>
      </Router>

    );
  }
}
export default Controller;
