import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { cardDetails } from '../Styles/styles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { detailsStyles } from '../Styles/styles';
import voteAvg from '../Assets/vote-count.svg';
import releaseDate from '../Assets/release-date.svg';
import voteCount from '../Assets/vote-avg.svg';
import CircularProgress from '@material-ui/core/CircularProgress';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@inject('MovieStore', 'CastStore')
@withRouter
@observer
export default class MovieDetail extends Component {

  componentDidMount(){
    window.scrollTo(0,0);
    console.log(this.props.match.params.postId, 'ssa');
    const movieId = this.props.match.params.postId;
    this.props.CastStore.fetchCastData(movieId);
  }
  __renderCast(){
    let renderCastBlock = [];
    renderCastBlock = this.props.CastStore.cast !== undefined ?
     this.props.CastStore.cast.map((item, index) => {
       return (
        <div key={item.credit_id} className="cast-single">
          <div className="cast-single__header"
          style={Object.assign({ backgroundImage:`url(https://image.tmdb.org/t/p/original${item.profile_path})`},cardDetails.castHeader)}>
            &nbsp;
          </div>
          <div className="cast-single__info">
            <p className="character">{item.character}</p>
            <h3 className="name">{item.name}</h3>
          </div>
        </div>
       );
     })
     : [];
    return renderCastBlock;
  }
  render(){
    const { movies } = this.props.MovieStore;
    const { isLoading, isError } = this.props.CastStore;

    if (isError) {
      return <div className="movie-listing__error">
          <h3> Oops! There was an error loading the cast details </h3>
      </div>
    }

    if (isLoading) {
      return <div className="movie-listing__error">
            <CircularProgress size={150} thickness={2}/>
      </div>;
    }

    const movieId = this.props.match.params.postId;
    const currentMovie = movies.find(obj => obj.id == movieId);
    return(
      <div className="details">
        {
          movies.length > 0 && Object.keys(currentMovie).length > 0 ?
          <div>
            <div className="details-header" style={Object.assign({ backgroundImage:`url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`},cardDetails.headerStyles)}>
              &nbsp;
            </div>
            <div className="details-body">
              <div className="details-content">
                <div className="details-saver">
                  <h2>{currentMovie.original_title}</h2>
                  {
                    currentMovie.saved ?
                    <Button aria-label="Saved" size={'large'} onClick={() => this.props.MovieStore.toggleSave(currentMovie.id)}>
                      <Icon style={detailsStyles.saveIcon}>
                          favorite
                      </Icon>
                    </Button>
                    :
                    <Button aria-label="Save" size={'large'} onClick={() => this.props.MovieStore.toggleSave(currentMovie.id)}>
                      <Icon style={detailsStyles.saveIcon}>
                          favorite_border
                      </Icon>
                    </Button>
                  }
                </div>
                <div>
                  <p><strong>Overview :</strong> {currentMovie.overview}</p>
                </div>
                <div className="details-additional">
                  <img src={voteAvg} alt="vote average" />
                  <p>Vote average: {currentMovie.vote_average} / 10</p>
                </div>
                <div className="details-additional">
                  <img src={voteCount} alt="vote count" />
                  <p>Vote count: {currentMovie.vote_count}</p>
                </div>
                <div className="details-additional">
                  <img src={releaseDate} alt="release date" />
                  <p>Release date: {currentMovie.release_date}</p>
                </div>
              </div>
            </div>
            <div className="details-cast">
              <p style={cardDetails.castText}>Full Cast</p>
              {this.__renderCast()}
            </div>
          </div>
          : <p>Wait for it</p>
        }
      </div>
    )
  }
}
