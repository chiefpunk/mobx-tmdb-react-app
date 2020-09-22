import { observable, action, reaction, autorun, computed } from 'mobx';
import Movie from './Movie';

export class MovieStore {
    @observable movies = [];
    @observable isLoading = false;
    @observable isError = false;
    @observable filter = "";

    fetchMovies(){
      this.isLoading = true;
      fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=28967d69513d49d94603253876b995a8&language=en-US&page=1`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((response) => {
        this.isLoading = false;
        response.results.map(item => {
          this.movies.push(new Movie(item));
        });
      })
      .catch(error => {
        this.isLoading = false;
        this.isError = true;
        console.log("Error is fetching movies", error)
      });
    }
    @action toggleSave(index){
      var obj = this.movies.filter(function ( obj ) {
      return obj.id === index;
      })[0];
      obj.saved = !obj.saved;
    }
    @computed get filteredMovie(){
      var matchesFilter = new RegExp(this.filter, "i");
      return this.movies.filter(todo => !this.filter || matchesFilter.test(todo.original_title))
    }
}

export default new MovieStore();
