import Firebase from 'firebase';
import React from 'react';
import update from 'react-addons-update';

import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';

import {firebaseRef} from '../constants/firebase-url'

const PostForm = React.createClass({
  getInitialState() {
    return {form: {}};
  },
  handleChange(e, formField) {
    let newFieldData = {};
    newFieldData[formField] = {$set: e.target.value};
    this.setState({form: update(this.state.form, newFieldData)});
  },
  handleSubmit() {
    let timestamp = Date.now();
    let createdAt = {
      $merge: {
        createdAt: timestamp,
        sortOrder: timestamp * -1
      }
    };
    let newPostData = update(this.state.form, createdAt);
    firebaseRef.child('posts').push(newPostData);
    this.setState({form: {title: '', imageUrl: '', body: ''}});
    debugger;
    this.props.onClose();
  },
  render() {
    return (
      <div>
        <h3>Add New Post</h3>
        <TextField
          floatingLabelText="Title"
          value={this.state.form.title}
          onChange={(e) => this.handleChange(e, 'title')}
          style={styles.textField}
        /><br/>
        <TextField
          floatingLabelText="Image Url"
          value={this.state.form.imageUrl}
          onChange={(e) => this.handleChange(e, 'imageUrl')}
          style={styles.textField}
        /><br/>
        <TextField
          floatingLabelText="Body"
          value={this.state.form.body}
          onChange={(e) => this.handleChange(e, 'body')}
          multiLine={true}
          rows={10}
          rowsMax={10}
          style={styles.textField}
        /><br/>
        <RaisedButton
          label="Submit"
          primary={true}
          onMouseDown={this.handleSubmit}
          style={styles.submitButton}
        />
      </div>
    );
  }
});

const styles = {
  textField: {
    width: '100%'
  },
  submitButton: {
    marginTop: '15px'
  }
};

export default PostForm