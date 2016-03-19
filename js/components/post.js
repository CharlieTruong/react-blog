import React from 'react';
import ReactMarkdown from 'react-markdown'

const Post = React.createClass({  
  render() {
    return (
      <div>
        <ReactMarkdown source={'# Header in markdown'}/>
        <div>{this.props.title}</div>
      </div>
    );
  }
});

export default Post