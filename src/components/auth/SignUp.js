import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { userActions } from '../../store/actions/userActions';
import {
  Button,
  TextField,
  Link,
  Checkbox,
  Typography
} from '@material-ui/core';
import {setPageName} from '../../store/actions/rootActions';

const SignUp = props => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    // Update the document title using the browser API
    dispatch(setPageName('Sign Up'));
  });


  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const handleSignUp = event => {
    event.preventDefault();
    dispatch(userActions.signUp(email, password, firstName, lastName));
  };

  return (
    <div className={classes.root}>
        <div className={classes.content}>
        <div className={classes.contentBody}>
            <form
            className={classes.form}
            onSubmit={handleSignUp}
            >
            <Typography
                className={classes.title}
                variant="h2"
            >
                Create new account
            </Typography>
            <Typography
                color="textSecondary"
                gutterBottom
            >
                Use your email to create new account
            </Typography>
            <TextField
                className={classes.textField}
                fullWidth
                label="First name"
                name="firstName"
                type="text"
                variant="outlined"
                onChange={handleFirstNameChange}
            />
            <TextField
                className={classes.textField}
                fullWidth
                label="Last name"
                name="lastName"
                type="text"
                variant="outlined"
                onChange={handleLastNameChange}
            />
            <TextField
                className={classes.textField}
                fullWidth
                label="Email"
                name="email"
                type="email"
                variant="outlined"
                onChange={handleEmailChange}
            />
            <TextField
                className={classes.textField}
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
                onChange={handlePasswordChange}
            />
            <div className={classes.policy}>
                <Checkbox
                className={classes.policyCheckbox}
                color="primary"
                name="policy"
                />
                <Typography
                className={classes.policyText}
                color="textSecondary"
                variant="body1"
                >
                I have read the{' '}
                <Link
                    color="primary"
                    component={RouterLink}
                    to="#"
                    underline="always"
                    variant="h6"
                >
                    Terms and Conditions
                </Link>
                </Typography>
            </div>
            <Button
                className={classes.signUpButton}
                color="primary"
                fullWidth
                size="large"
                type="submit"
                variant="contained"
            >
                Sign up now
            </Button>
            <Typography
                color="textSecondary"
                variant="body1"
            >
                Have an account?{' '}
                <Link
                component={RouterLink}
                to="/signin"
                variant="h6"
                >
                Sign in
                </Link>
            </Typography>
            </form>
        </div>
        </div>
    </div>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    // alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  signUpButton: {
    margin: theme.spacing(2, 0)
  }
}));

export default SignUp;