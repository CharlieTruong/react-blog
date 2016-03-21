import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Link } from 'react-router';
import Box from 'react-layout-components'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';

import '../../css/animations.css'

const ACTIVE = {color: 'green'}

const Home = React.createClass({  
  componentWillMount() {
    const mql = window.matchMedia('only screen and (max-width: 414px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql: mql,
      phoneLayout: mql.matches,
      tabValue: this.props.location.pathname
    });
  },
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  },
  handleTabChange(value, e, tab) {
    this.props.history.push(value);
    this.setState({tabValue: value});
  },
  mediaQueryChanged() {
    this.setState({phoneLayout: this.state.mql.matches});
  },
  render() {
    let layoutWidth = this.state.phoneLayout ? '100%' : '80%'

    return (
      <Box fit column alignItems="center">
        <Box column width={layoutWidth}>
          <Tabs onChange={this.handleTabChange} value={this.state.tabValue}>
            <Tab label="Posts" value="/"/>
            <Tab label="About Me" value="/about"/>
          </Tabs>
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
        </Box>
      </Box>
    );
  }
});

export default Home