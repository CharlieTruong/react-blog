import React from 'react';

import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

import {firebaseRef, currentUser} from '../constants/firebase-url'

const AdminControls = React.createClass({
  login() {
    firebaseRef.authWithOAuthPopup("google", (error, authData) => {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        currentUser.authData = authData;
        this.props.history.push(this.props.afterLoginPath);
      }
    });
  },
  render() {
    return (
      <IconMenu
        iconButtonElement={
          <IconButton iconStyle={styles}><MoreVertIcon/></IconButton>
        }
        style={styles}
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <MenuItem primaryText="Login" onClick={this.login}/>
      </IconMenu>
    );
  }
});

const styles = {
  fill: '#fff'
}

export default AdminControls