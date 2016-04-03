import React from 'react';

import ReactFireMixin from 'reactfire';
import FloatingActionButton from 'material-ui/lib/floating-action-button';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Dialog from 'material-ui/lib/dialog';

import Post from './post';
import PostForm from './post-form';
import {firebaseRef, currentUser} from '../constants/firebase-url'

const Posts = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount() {
    let ref = firebaseRef
      .child('posts')
      .orderByChild('sortOrder')
    this.bindAsArray(ref, 'posts');
    this.setState
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

    let PostNodes = this.state.posts.map(post => {
      return (
        <div style={styles.post}>
          <Post title={post.title} key={post['.key']}/>
        </div>
      );
    });

    return (
      <div>
        {PostNodes}
        {addButton}
        <Dialog
          open={this.state.open}
          onRequestClose={this.closeAddPostModal}
        >
          <PostForm/>
        </Dialog>
      </div>
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