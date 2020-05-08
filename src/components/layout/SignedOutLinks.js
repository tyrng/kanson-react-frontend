import React from 'react';
import { NavLink  } from 'react-router-dom';
import { Link } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
 
 
const SignedOutLinks = (props) => {
    const { activeLinkClass } = props;
    return (
    <div>
    <List>
        <Link
        component={NavLink}
        to="/signin"
        underline='none'
        color='inherit'
        activeClassName={activeLinkClass}
        exact
        >
            <ListItem button key='Sign In'>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary='Sign In' />
            </ListItem>
        </Link>
        <Link
        component={NavLink}
        to="/signup"
        underline='none'
        color='inherit'
        activeClassName={activeLinkClass}
        exact
        >
            <ListItem button key='Sign Up'>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary='Sign Up' />
            </ListItem>
        </Link>
    </List>
    </div>
)};

export default SignedOutLinks;