import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Home from './home';
import Posts from './posts';
import Post from './post';
import About from './about';

const history = createBrowserHistory()

const routes = (
  <Router history={history}>
    <Route path="/" component={Home}>
      <IndexRoute component={Posts}/>
      <Route path="posts/:id" component={Post}/>
      <Route path="about" component={About}/>
    </Route>
  </Router>
);


export default routes