import React from 'react';
import { IndexRoute, Router, Route } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory'
import Home from './home';
import Posts from './posts';
import About from './about';

const history = createBrowserHistory()

const Null = React.createClass({
  render() {
    return false;
  }
});

const routes = (
  <Router history={history}>
    <Route path="/" component={Home}>
      <IndexRoute component={Posts}/>
      <Route path="posts/:id"/>
      <Route path="about" component={About}/>
      <Route path="admin" component={Null}/>
    </Route>
  </Router>
);


export default routes