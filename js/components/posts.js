import React from 'react';
import ReactFireMixin from 'reactfire';
import Firebase from 'firebase';
import Post from './post';
import FIREBASE_URL from '../constants/firebase-url'

const Posts = React.createClass({
  mixins: [ReactFireMixin],
  componentWillMount() {
    let postsUrl = `${FIREBASE_URL}/posts`;
    let ref = new Firebase(postsUrl);
    ref = ref.orderByChild('createdAtDate').limitToLast(2);
    this.bindAsArray(ref, 'posts');
  },
  render() {
    let PostNodes = this.state.posts.map(post => {
      return (
        <Post title={post.title} key={post['.key']}>
        </Post>
      );
    });

    return (
      <div>{PostNodes}</div>
    );
  }
});

export default Posts