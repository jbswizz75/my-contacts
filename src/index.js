// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
// import Home from './components/home';

import './style.scss';
import filmDetails from './components/films/filmDetails';
import Home from './components/home/index';

const App = () => (
  <Router>
    <div>
      <Switch>
        {/* <Home /> */}
        <Route exact path="/accueil" component={Home} />
        <Route exact path="/:id" component={filmDetails} />
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
