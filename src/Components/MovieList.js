import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import MovieTile from './MovieTile';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import { FilterStyles } from '../Styles/styles';
import { withStyles } from '@material-ui/core/styles';

@inject('MovieStore')
@observer class MovieList extends Component {
  componentDidMount(){
    window.scrollTo(0,0);
    if(Object.keys(this.props.MovieStore.movies).length == 0){
      this.props.MovieStore.fetchMovies();
    }
  }
  renderTiles(){
    let renderBlock = [];
    renderBlock = this.props.MovieStore.filteredMovie !== undefined ?
     this.props.MovieStore.filteredMovie.map((key, index) => {
       return (
         <MovieTile key={index} {...this.props} movies={this.props.MovieStore.filteredMovie} i={index} />
       );
     })
     : [];
    return renderBlock;
  }
  handleFilter(e){
    this.props.MovieStore.filter = e.target.value;
  }
  render() {
    const { movies, isLoading, isError, filter } = this.props.MovieStore;
    const { classes } = this.props;

    if (isError) {
      return <div className="movie-listing__error">
            <h3> Oops! There was an error loading the movies </h3>
      </div>;
    }
    if (isLoading) {
      return <div className="movie-listing__error">
            <CircularProgress size={150} thickness={2}/>
      </div>;
    }
    return (
      <div className="movie-listing">
        <div className="movie-listing__filter">
          <h1>Upcoming movies</h1>
          <TextField id="movie-filter" variant="outlined"  className={classes.inputBox}
           value={filter} onChange={this.handleFilter.bind(this)}  placeholder={'Search for a movie'}/>
        </div>
        <div className="movie-listing__blocks">
          {this.renderTiles()}
        </div>
      </div>
    )
  }
}
export default withStyles(FilterStyles)(MovieList);
