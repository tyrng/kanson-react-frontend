import { combineReducers } from 'redux';
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase';
import listReducer from './listReducer';
import boardReducer from './boardReducer';
import cardReducer from './cardReducer';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import usersReducer from './usersReducer';
import { CONSTANTS, userConstants } from '../actions/rootActions';

const searchInitialState = '';

const searchReducer = (state = searchInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.SEARCH:
            return action.payload.text
        default:
            return state;
    }
}

const pageNameInitialState = '';

const pageNameReducer = (state = pageNameInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.PAGENAME:
            return action.payload.text
        default:
            return state;
    }
}

// Combine all reducers.
const appReducer = combineReducers({
    cards: cardReducer,
    lists: listReducer,
    boards: boardReducer,
    search: searchReducer,
    pageName: pageNameReducer,
    alert: alertReducer,
    authentication: authReducer,
    users: usersReducer
 });

 const rootReducer = (state, action) => {   
    // Clear all data in redux store to initial.
    if(action.type === userConstants.LOGOUT)
       state = undefined;
    
    return appReducer(state, action);
 };
 export default rootReducer;