import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Home from './components/home/Home';
// import { useSelector } from 'react-redux'
// import { isLoaded } from 'react-redux-firebase'

// function AuthIsLoaded({ children }) {
//   const auth = useSelector(state => state.firebase.auth)
//   if (isLoaded(auth)) return children;
//   return null;
// }

export let signedIn = true;

function App() {
  return (
    <BrowserRouter>
      {/* <AuthIsLoaded> */}
        <div  className="App">
          <Navbar signedIn={signedIn} pageName="TODO">
            <Switch>
              <Route path='/home' component={Home} exact/>
              <Route path='/board/:id' component={Home} exact/>
              <Route path='/signin' component={SignIn} exact/>
              <Route path='/signup' component={SignUp} exact/>
            </Switch>
          </Navbar>
        </div>
      {/* </AuthIsLoaded> */}
    </BrowserRouter>
  );
}

export default App;