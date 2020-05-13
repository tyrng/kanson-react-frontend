import { CONSTANTS } from '../actions/rootActions';

const initialState = {
    pending: false,
    adding: false,
    updating: false,
    deleting: false,
    sorting: false,
    boards: [],
    error: null,
    currentBoardId: null
}

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.SET_CURRENT_BOARDID:
            return {
                ...state,
                currentBoardId: action.payload.currentBoardId
            }
        case CONSTANTS.FETCH_BOARDS_PENDING:
            return {
                ...state,
                pending: true
            }
        case CONSTANTS.FETCH_BOARDS_SUCCESS:
            return {
                ...state,
                pending: false,
                boards: action.payload.boards
            }
        case CONSTANTS.FETCH_BOARDS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }
        case CONSTANTS.ADD_BOARD_PENDING:
            return {
                ...state,
                adding: true
            }
        case CONSTANTS.ADD_BOARD_SUCCESS:
            return {
                ...state,
                adding: false
            }
        case CONSTANTS.ADD_BOARD_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload.error
            }
        case CONSTANTS.UPDATE_BOARD_PENDING:
            return {
                ...state,
                updating: true
            }
        case CONSTANTS.UPDATE_BOARD_SUCCESS:
            return {
                ...state,
                updating: false
            }
        case CONSTANTS.UPDATE_BOARD_FAILURE:
            return {
                ...state,
                updating: false,
                error: action.payload.error
            }
        case CONSTANTS.DELETE_BOARD_PENDING:
            return {
                ...state,
                deleting: true
            }
        case CONSTANTS.DELETE_BOARD_SUCCESS:
            return {
                ...state,
                deleting: false
            }
        case CONSTANTS.DELETE_BOARD_FAILURE:
            return {
                ...state,
                deleting: false,
                error: action.payload.error
            }
        case CONSTANTS.SORT_BOARD_PENDING:
            return {
                ...state,
                sorting: true
            }
        case CONSTANTS.SORT_BOARD_SUCCESS:
            return {
                ...state,
                sorting: false
            }
        case CONSTANTS.SORT_BOARD_FAILURE:
            return {
                ...state,
                sorting: false,
                error: action.payload.error
            }
        case CONSTANTS.UPDATE_BOARD_UI_IMMEDIATE:
            return {
                ...state,
                sorting: state.sorting,
                boards: action.payload.boards != null ? [...action.payload.boards] : [...state.boards]
            }
        default:
            return state;
    }
};

export default boardReducer;