import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  TextField,
  Link,
  Checkbox,
  Typography
} from '@material-ui/core';

const SignUp = props => {
  const classes = useStyles();

  const handleSignUp = event => {
    event.preventDefault();
    console.log('signup clicked')
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
            />
            <TextField
                className={classes.textField}
                fullWidth
                label="Last name"
                name="lastName"
                type="text"
                variant="outlined"
            />
            <TextField
                className={classes.textField}
                fullWidth
                label="Email address"
                name="email"
                type="text"
                variant="outlined"
            />
            <TextField
                className={classes.textField}
                fullWidth
                label="Password"
                name="password"
                type="password"
                variant="outlined"
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