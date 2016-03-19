import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { Link } from 'react-router';
import '../../css/animations.css'

const ACTIVE = {color: 'green'}

const Home = React.createClass({  
  render() {
    return (
      <div>
        <div className="nav">
          <Link to="/" activeStyle={ACTIVE}>Home</Link>
          <Link to="about" activeStyle={ACTIVE}>About</Link>
        </div>
        <ReactCSSTransitionGroup
          component="div"
          transitionName="example"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          {React.cloneElement(this.props.children, {
            key: this.props.location.pathname
          })}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

export default Home