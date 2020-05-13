import { userConstants } from '../actions/rootActions';

const initialState = {
    loading: false,
    users: [],
    error: false
}

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case userConstants.GETALL_SUCCESS:
            return {
                users: action.users
            };
        case userConstants.GETALL_FAILURE:
            return { 
                error: action.error
            };
        default:
            return state
    }
}
export default usersReducer;