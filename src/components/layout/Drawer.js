import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Drawer = (props) => {
    const classes = UseStyles();
    const { drawerState, toggleDrawer, signedIn, setDragging } = props;

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
            {signedIn ? <SignedInLinks toggleDrawer={toggleDrawer} setDragging={setDragging} activeLinkClass={classes.activeLink}/> : <SignedOutLinks activeLinkClass={classes.activeLink}/>}
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