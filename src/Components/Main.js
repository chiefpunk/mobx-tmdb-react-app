import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Counter from './Counter';
import Todo from './Todo';
import NoMatch from './NoMatch';
import MovieList from './MovieList';
import MovieDetail from './MovieDetail';
import SavedList from './SavedList';

const Main = (props) => {
  return <main className="Movie-content">
    <Switch>
      <Route exact path='/' render={() => <MovieList />} />
      <Route path='/view/:postId' render={() => <MovieDetail />} />
      <Route path='/saved' render={() => <SavedList />} />
      <Route component={NoMatch} />
    </Switch>
  </main>
}

export default Main;
