import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { alertActions } from './store/actions/alertActions';
import { PrivateRoute } from './components/PrivateRoute';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/home/Home';
import history from './helpers/history'
class App extends React.Component {
  constructor(props) {
      super(props);

      const { dispatch } = this.props;
      history.listen((location, action) => {
          // clear alert on location change
          dispatch(alertActions.clear());
      });
  }
  render(){
    const { alert } = this.props;
    return (
      <div>
        {alert.message &&
          <div className={`alert ${alert.type}`}>{alert.message}</div>
        }
        <Router history={history}>
          <div  className="App">
            <Navbar>
              <Switch>
                <Redirect exact from="/" to="/home" />
                <PrivateRoute path='/home' component={Home} exact/>
                <PrivateRoute path='/board/:id' component={Home} exact/>
                <Route path='/signin' component={SignIn} exact/>
                <Route path='/signup' component={SignUp} exact/>
              </Switch>
            </Navbar>
          </div>
        </Router>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { alert } = state;
  return {
      alert
  };
}
export default connect(mapStateToProps)(App);