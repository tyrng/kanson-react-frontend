import React from 'react';
import { useSelector } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Drawer = (props) => {
    const classes = UseStyles();
    const { drawerState, toggleDrawer, setDragging, user } = props;
    const loggedIn = useSelector(state => state.authentication.loggedIn);

    return (
        <SwipeableDrawer
        anchor='left'
        open={drawerState}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
            className={classes.list}
            role="presentation"
        >
            {loggedIn ? <SignedInLinks toggleDrawer={toggleDrawer} setDragging={setDragging} activeLinkClass={classes.activeLink} user={user}/> : <SignedOutLinks activeLinkClass={classes.activeLink}/>}
        </div>
      </SwipeableDrawer>
    )
}
const UseStyles = makeStyles((theme) => ({
  list: {
    width: 300,
  },
  activeLink: {
      '& .MuiListItem-button': {
          backgroundColor: fade(theme.palette.common.black, 0.15),
      }
  }
}))

export default Drawer;