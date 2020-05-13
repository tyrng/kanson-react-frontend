import { CONSTANTS } from '../actions/rootActions';

const initialState = {
    pending: false,
    adding: false,
    sorting: false,
    lists: [],
    error: null,
    updating: false,
    deleting: false
}

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.FETCH_LISTS_PENDING:
            return {
                ...state,
                pending: true
            }
        case CONSTANTS.FETCH_LISTS_SUCCESS:
            return {
                ...state,
                pending: false,
                lists: action.payload.lists
            }
        case CONSTANTS.FETCH_LISTS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }
        case CONSTANTS.ADD_LIST_PENDING:
            return {
                ...state,
                adding: true
            }
        case CONSTANTS.ADD_LIST_SUCCESS:
            return {
                ...state,
                adding: false
            }
        case CONSTANTS.ADD_LIST_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload.error
            }
        case CONSTANTS.UPDATE_LIST_PENDING:
            return {
                ...state,
                updating: true
            }
        case CONSTANTS.UPDATE_LIST_SUCCESS:
            return {
                ...state,
                updating: false
            }
        case CONSTANTS.UPDATE_LIST_FAILURE:
            return {
                ...state,
                updating: false,
                error: action.payload.error
            }
        case CONSTANTS.DELETE_LIST_PENDING:
            return {
                ...state,
                deleting: true
            }
        case CONSTANTS.DELETE_LIST_SUCCESS:
            return {
                ...state,
                deleting: false
            }
        case CONSTANTS.DELETE_LIST_FAILURE:
            return {
                ...state,
                deleting: false,
                error: action.payload.error
            }
        case CONSTANTS.SORT_LIST_PENDING:
            return {
                ...state,
                sorting: true
            }
        case CONSTANTS.SORT_LIST_SUCCESS:
            return {
                ...state,
                sorting: false
            }
        case CONSTANTS.SORT_LIST_FAILURE:
            return {
                ...state,
                sorting: false,
                error: action.payload.error
            }
        case CONSTANTS.UPDATE_LIST_UI_IMMEDIATE:
            return {
                ...state,
                sorting: state.sorting,
                lists: action.payload.lists != null ? [...action.payload.lists] : [...state.lists]
            }
        default:
            return state;
    }
};

export default listReducer;