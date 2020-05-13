import { CONSTANTS } from './rootActions';
import { fetchLists, fetchListsByBoardId } from './listActions';
import {apiUrl} from '../../config/apiConfig';
import { authHeader } from '../../helpers/authHeader';
import { v4 as uuidv4 } from 'uuid';
const arrayMove = require('array-move');

export const setCurrentBoardId = (currentBoardId) => {
    return {
        type: CONSTANTS.SET_CURRENT_BOARDID,
        payload: { currentBoardId }
    }
}

export const fetchBoardsPending = () => {
    return {
        type: CONSTANTS.FETCH_BOARDS_PENDING
    }
}

export const fetchBoardsSuccess = (boards) => {
    return {
        type: CONSTANTS.FETCH_BOARDS_SUCCESS,
        payload: { boards }
    }
}

export const fetchBoardsError = (error) => {
    return {
        type: CONSTANTS.FETCH_BOARDS_FAILURE,
        payload: { error }
    }
}

export const fetchBoards = () => {
    return dispatch => {
        dispatch(fetchBoardsPending());
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        fetch(`${apiUrl}/boards`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchBoardsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchBoardsError(error));
        })
    }
}

export const addBoardPending = () => {
    return {
        type: CONSTANTS.ADD_BOARD_PENDING
    }
}

export const addBoardSuccess = () => {
    return {
        type: CONSTANTS.ADD_BOARD_SUCCESS
    }
}

export const addBoardError = (error) => {
    return {
        type: CONSTANTS.ADD_BOARD_FAILURE,
        payload: { error }
    }
}


export const addBoard = (title) => {
    return (dispatch, getState) => {
        dispatch(addBoardPending());
        let user = JSON.parse(localStorage.getItem('user'));
        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: uuidv4(), userId: user.id, index: getState().boards.boards.length, title: title.trim() })
        };
        fetch(`${apiUrl}/boards`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(addBoardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchBoards());
            return res;
        })
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(addBoardError(error));
        })
    }
};

export const updateBoardPending = () => {
    return {
        type: CONSTANTS.UPDATE_BOARD_PENDING
    }
}

export const updateBoardSuccess = () => {
    return {
        type: CONSTANTS.UPDATE_BOARD_SUCCESS
    }
}

export const updateBoardError = (error) => {
    return {
        type: CONSTANTS.UPDATE_BOARD_FAILURE,
        payload: { error }
    }
}

export const updateBoard = (boardId, title) => {
    return (dispatch, getState) => {
        dispatch(updateBoardPending());
        const board = getState().boards.boards.find(board => board.id === boardId);
        const requestOptions = {
            method: 'PUT',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: board.id, userId: board.userId, index: board.index, title: title.trim() })
        };
        fetch(`${apiUrl}/boards/${boardId}`, requestOptions)
        .then(res => {
            if(res.status !== 204) return res.json()
            else return { }
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(updateBoardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchBoards());
            return res;
        })
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(updateBoardError(error));
        })
    }
}

export const deleteBoardPending = () => {
    return {
        type: CONSTANTS.DELETE_BOARD_PENDING
    }
}

export const deleteBoardSuccess = () => {
    return {
        type: CONSTANTS.DELETE_BOARD_SUCCESS
    }
}

export const deleteBoardError = (error) => {
    return {
        type: CONSTANTS.DELETE_BOARD_FAILURE,
        payload: { error }
    }
}

export const deleteBoard = (boardId) => {
    return (dispatch, getState) => {
        dispatch(deleteBoardPending());
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        fetch(`${apiUrl}/boards/${boardId}`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(deleteBoardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchBoards());
            return res;
        })
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(deleteBoardError(error));
        })
    }
}

export const sortBoardPending = () => {
    return {
        type: CONSTANTS.SORT_BOARD_PENDING
    }
}

export const sortBoardSuccess = () => {
    return {
        type: CONSTANTS.SORT_BOARD_SUCCESS
    }
}

export const sortBoardError = (error) => {
    return {
        type: CONSTANTS.SORT_BOARD_FAILURE,
        payload: { error }
    }
}
export const sort = (oldIndex, newIndex) => {
    return (dispatch, getState) => {
        dispatch(sortBoardPending());

        const boards = [...getState().boards.boards];
        boards.sort((a,b) => a.index - b.index);

        const newBoards = arrayMove(boards, oldIndex, newIndex);

        const objectToSend = { };
        newBoards.forEach((board, index) => {
            board.index = index;
            objectToSend[board.id] = index;
        })

        dispatch(updateBoardUIImmediate(newBoards));

        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(objectToSend)
        };
        fetch(`${apiUrl}/boards/sort`, requestOptions)
        .then(res => {
            if(res.status !== 204) return res.json()
            else return { }
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(sortBoardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchBoards());
            return res;
        }) // TODO: Sort lists
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(sortBoardError(error));
        })
    }
}
export const updateBoardUIImmediate = (boards) => {
    return {
        type: CONSTANTS.UPDATE_BOARD_UI_IMMEDIATE,
        payload: { boards }
    }
}