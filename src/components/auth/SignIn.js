import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import { userActions } from '../../store/actions/userActions';
import {setPageName} from '../../store/actions/rootActions';

class SignIn extends React.Component {
  state = {
    username: '',
    password: '',
    submitted: false
  };

  componentDidMount = () => {
    this.props.dispatch(userActions.logout());
    this.props.dispatch(setPageName('Sign In'));
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSignIn = (e) => {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    const { dispatch } = this.props;
    if (username && password) {
        dispatch(userActions.login(username, password));
    }
  }

  handleSocialSignIn = event => {
    event.preventDefault();
    console.log('not yet implemented');
  };

  render() {
    const {classes} = this.props;
    return (
      <div className={classes.root}>
          <div className={classes.content}>
              <div className={classes.contentBody}>
                  <form
                  className={classes.form}
                  onSubmit={this.handleSocialSignIn}
                  >
                  <Typography
                      className={classes.title}
                      variant="h2"
                  >
                      Sign in
                  </Typography>
                  <Typography
                      color="textSecondary"
                      gutterBottom
                  >
                      Sign in with social media
                  </Typography>
                  <Grid
                      className={classes.socialButtons}
                      container
                      spacing={2}
                  >
                      <Grid item>
                      <Button
                          color="primary"
                          onClick={this.handleSocialSignIn}
                          size="large"
                          variant="contained"
                      >
                          Login with Facebook
                      </Button>
                      </Grid>
                      <Grid item>
                      <Button
                          onClick={this.handleSocialSignIn}
                          size="large"
                          variant="contained"
                      >
                          Login with Google
                      </Button>
                      </Grid>
                  </Grid>
                  <Typography
                      align="center"
                      className={classes.sugestion}
                      color="textSecondary"
                      variant="body1"
                  >
                      or login with email address
                  </Typography>
                  <TextField
                      className={classes.textField}
                      fullWidth
                      label="Username"
                      name="username"
                      onChange={this.handleChange}
                      type="text"
                      variant="outlined"
                  />
                  <TextField
                      className={classes.textField}
                      fullWidth
                      label="Password"
                      name="password"
                      onChange={this.handleChange}
                      type="password"
                      variant="outlined"
                  />
                  <Button
                      className={classes.signInButton}
                      onClick={this.handleSignIn}
                      color="primary"
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                  >
                      Sign in now
                  </Button>
                  <Typography
                      color="textSecondary"
                      variant="body1"
                  >
                      Don't have an account?{' '}
                      <Link
                      component={RouterLink}
                      to="/signup"
                      variant="h6"
                      >
                      Sign up
                      </Link>
                  </Typography>
                  </form>
              </div>
          </div>
      </div>
    );
  }
};

const styles = (theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%',
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
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  }
});

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
      loggingIn
  };
}

export default compose(
  connect(mapStateToProps),
   withStyles(styles)
   )(SignIn);