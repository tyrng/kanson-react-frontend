import { combineReducers } from 'redux';
// import { firestoreReducer } from 'redux-firestore';
// import { firebaseReducer } from 'react-redux-firebase';
import listReducer from './listReducer';
import boardReducer from './boardReducer';
import cardReducer from './cardReducer';
import { CONSTANTS } from '../actions/rootActions';

const searchInitialState = ''

const searchReducer = (state = searchInitialState, action) => {
    switch (action.type) {
        case CONSTANTS.SEARCH:
            return action.payload.text
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    // firestore: firestoreReducer,
    // firebase: firebaseReducer,
    cards: cardReducer,
    lists: listReducer,
    boards: boardReducer,
    search: searchReducer
});

export default rootReducer;