import React from 'react';

import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardTitle from 'material-ui/lib/card/card-title';
import CardText from 'material-ui/lib/card/card-text';
import Dotdotdot from 'react-clamp'

const DefaultImage = 'https://pixabay.com/static/uploads/photo/2016/03/27/18/54/technology-1283624_640.jpg';

const PostPreview = React.createClass({  
  render() {
    let imageUrl = this.props.post.imageUrl || DefaultImage;
    let postDate = new Date(this.props.post.createdAt);

    return (
      <Card>
        <CardMedia
          overlay={
            <CardTitle
              title={this.props.post.title}
              subtitle={postDate.toLocaleDateString()}
            />
          }
        >
          <img src={imageUrl} style={styles.image}/>
        </CardMedia>
        <CardText>
          <Dotdotdot clamp={3}>
            <div>{this.props.post.body}</div>
          </Dotdotdot>
        </CardText>
      </Card>
    );
  }
});

const styles = {
  image: {
    height: '230px'
  }
};

export default PostPreview