import React from 'react';
import Main from './Components/Main';
import Header from './Components/Header';
import Navigation from './Components/Navigation';
import DevTools from 'mobx-react-devtools';
import './App.css';

const App = (props) => (
  <section className="Main">
    <DevTools/>
    <Header />
    <div className="Main-content">
      <Navigation />
      <Main />
    </div>
  </section>
)
export default App;
