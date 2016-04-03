import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import { Link } from 'react-router';
import Box from 'react-layout-components'
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import AppBar from 'material-ui/lib/app-bar';
import {cyan300} from 'material-ui/lib/styles/colors';
import {StickyContainer, Sticky} from 'react-sticky';

import AdminControls from './admin-controls';

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
      <StickyContainer>
        <Sticky>
          <AppBar
            title="Musings"
            showMenuIconButton={false}
            zDepth={0}
            iconElementRight={
              this.props.location.pathname == '/admin'
              ? <AdminControls
                  afterLoginPath='/' history={this.props.history}
                />
              : null
            }
            style={styles.appBar}/>
          <Tabs onChange={this.handleTabChange} value={this.state.tabValue}>
            <Tab label="Posts" value="/"/>
            <Tab label="About Me" value="/about"/>
          </Tabs>
        </Sticky>
        <Box fit column alignItems="center">
          <Box column width={layoutWidth}>
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
      </StickyContainer>
    );
  }
});

const styles = {
  appBar: {
    backgroundColor: cyan300
  }
}

export default Home