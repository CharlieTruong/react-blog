import React from 'react';

import Box from 'react-layout-components'
import ReactFireMixin from 'reactfire';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';

import PostPreview from './post-preview';
import PostForm from './post-form';
import {
  firebaseRef,
  firebaseChildRefs,
  currentUser
} from '../constants/firebase-url';

const Posts = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount() {
    if (!firebaseChildRefs.posts) {
      firebaseChildRefs.posts = firebaseRef
        .child('posts')
        .orderByChild('sortOrder')
    }

    this.bindAsArray(firebaseChildRefs.posts, 'posts');
    const mql = window.matchMedia('only screen and (max-width: 414px)');
    mql.addListener(this.mediaQueryChanged);
    this.setState({
      mql: mql,
      phoneLayout: mql.matches
    });
  },
  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  },
  mediaQueryChanged() {
    this.setState({phoneLayout: this.state.mql.matches});
  },
  getInitialState() {
    return {open: false};
  },
  openAddPostModal() {
    this.setState({open: true});
  },
  closeAddPostModal() {
    this.setState({open: false});
  },
  render() {
    let addButton = null
    if (!!currentUser.authData) {
      addButton =
        <FloatingActionButton
          style={styles.addButton}
          onClick={this.openAddPostModal}
        >
          <ContentAdd />
        </FloatingActionButton>
    }

    if (this.state.phoneLayout) {
      styles.post.width = '100%';
      styles.post.marginRight = 0;
    } else {
      styles.post.width = '30%';
      styles.post.marginRight = '3%';
    }

    let PostNodes = this.state.posts.map(post => {
      return (
        <div style={styles.post}>
          <PostPreview title={post.title} key={post['.key']}
          />
        </div>
      );
    });

    return (
      <Box fit>
        <Box fit wrap>
          {PostNodes}
        </Box>
        {addButton}
        <Dialog
          open={this.state.open}
          onRequestClose={this.closeAddPostModal}
        >
          <PostForm/>
        </Dialog>
      </Box>
    );
  }
});

const styles = {
  post: {
    marginTop: 10
  },
  addButton: {
    position: 'fixed',
    right: '10%',
    bottom: '5%'
  }
}

export default Posts