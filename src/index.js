import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
// import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// import { reduxFirestore, createFirestoreInstance, getFirestore } from 'redux-firestore'
// import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
// import fbConfig from './config/fbConfig';
// import firebase from 'firebase/app'
// import 'firebase/firestore';
// import 'firebase/auth';

// // react-redux-firebase config
// const rrfConfig = {
//   userProfile: 'users',
//   useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
// }

// // Initialize firebase instance
// firebase.initializeApp(fbConfig)

// // Initialize other services on firebase instance
// firebase.firestore() // <- needed if using firestore

const store = createStore(rootReducer, applyMiddleware(thunk));

// const store = createStore(rootReducer,
//   compose(
//     applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
//     reduxFirestore(firebase)
//   )
// );

// const rrfProps = {
//   firebase,
//   config: rrfConfig,
//   dispatch: store.dispatch,
//   createFirestoreInstance // <- needed if using firestore
// };

ReactDOM.render(
  <Provider store={store}>
    {/* <ReactReduxFirebaseProvider {...rrfProps}> */}
      <App />
    {/* </ReactReduxFirebaseProvider> */}
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
