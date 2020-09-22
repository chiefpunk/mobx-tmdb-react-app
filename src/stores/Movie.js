import { observable } from 'mobx';

export class Movie {
    @observable original_title;
    @observable id;
    @observable poster_path;
    @observable overview;
    @observable saved;
    @observable vote_average;
    @observable vote_count;
    @observable release_date;
    @observable backdrop_path;

    constructor(item) {
      this.original_title = item.original_title;
      this.id = item.id;
      this.poster_path = item.poster_path;
      this.overview = item.overview;
      this.saved = false;
      this.vote_average = item.vote_average;
      this.vote_count = item.vote_count;
      this.release_date = item.release_date;
      this.backdrop_path = item.backdrop_path;
    }
}

export default Movie;
