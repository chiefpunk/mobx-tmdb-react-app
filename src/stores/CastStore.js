import { observable, action, reaction, autorun, computed } from 'mobx';

export class CastStore {
    @observable cast = [];
    @observable isLoading = false;
    @observable isError = false;

    fetchCastData(movieId){
      this.isLoading = true;
      fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=28967d69513d49d94603253876b995a8`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then((response) => {
        this.isLoading = false;
        this.cast = [];
        response.cast.map(item => {
          this.cast.push(item);
        });
      })
      .catch(error => {
        this.isLoading = false;
        this.isError = true;
        console.log("Error is fetching cast", error)
      });
    }
}

export default new CastStore();
