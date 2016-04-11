import React from 'react';

import ReactFireMixin from 'reactfire';

import {firebaseRef} from '../constants/firebase-url';

const Post = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState() {
    return {post: {}};
  },
  componentWillMount() {
    const postRef = firebaseRef
      .child('posts')
      .child(this.props.params.postId);

    this.bindAsObject(postRef, 'post');
  },
  render() {
    return (
      <div>{this.state.post.body}</div>
    );
  }
});

export default Post