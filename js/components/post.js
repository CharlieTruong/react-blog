import React from 'react';

import ReactMarkdown from 'react-markdown'
import Card from 'material-ui/lib/card/card';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';

const Post = React.createClass({  
  render() {
    return (
      <Card>
        <CardTitle title={this.props.title}/>
        <CardText>
          <ReactMarkdown source={'# Header in markdown'}/>
        </CardText>
      </Card>
    );
  }
});

export default Post