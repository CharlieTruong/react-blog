import React from 'react';
import ReactFireMixin from 'reactfire';

import Post from './post';
import firebaseRef from '../constants/firebase-url'

const Posts = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount() {
    let ref = firebaseRef
      .child('posts')
      .orderByChild('createdAtDate')
      .limitToLast(2);
    this.bindAsArray(ref, 'posts');
  },
  render() {
    let PostNodes = this.state.posts.map(post => {
      return (
        <div style={styles.post}>
          <Post title={post.title} key={post['.key']}/>
        </div>
      );
    });

    return (
      <div>{PostNodes}</div>
    );
  }
});

const styles = {
  post: {
    marginTop: 10
  }
}

export default Posts