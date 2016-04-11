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
    this.setTabValue();
  },
  componentWillReceiveProps() {
    this.setTabValue();
  },
  componentWillReceiveProps(nextProps) {
    this.setTabValue(nextProps.location.pathname);
  },
  setTabValue(pathname=this.props.location.pathname) {
    let tabValue = /^\/posts/.test(pathname) ? '/' : pathname;
    this.setState({tabValue: tabValue});
  },
  handleTabChange(tab) {
    this.props.history.push(tab.props.value);
  },
  render() {
    return (
      <StickyContainer>
        <Sticky stickyStyle={styles.header}>
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
          <Tabs value={this.state.tabValue}>
            <Tab
              label="Posts"
              value="/"
              onActive={this.handleTabChange}
            />
            <Tab
              label="About Me"
              value="/about"
              onActive={this.handleTabChange}
            />
          </Tabs>
        </Sticky>
        <Box fit column alignItems="center">
          <Box width="85%">
            {this.props.children}
          </Box>
        </Box>
      </StickyContainer>
    );
  }
});

const styles = {
  appBar: {
    backgroundColor: cyan300
  },
  header: {
    zIndex: 1
  }
}

export default Home