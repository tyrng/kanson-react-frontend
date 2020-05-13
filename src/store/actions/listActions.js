import { CONSTANTS } from '../actions/rootActions';
import {apiUrl} from '../../config/apiConfig';
import { authHeader } from '../../helpers/authHeader';
import { v4 as uuidv4 } from 'uuid';
import {setPageName} from '../../store/actions/rootActions';
const arrayMove = require('array-move');
export const fetchListsPending = () => {
    return {
        type: CONSTANTS.FETCH_LISTS_PENDING
    }
}

export const fetchListsSuccess = (lists) => {
    return {
        type: CONSTANTS.FETCH_LISTS_SUCCESS,
        payload: { lists }
    }
}

export const fetchListsError = (error) => {
    return {
        type: CONSTANTS.FETCH_LISTS_FAILURE,
        payload: { error }
    }
}

export const fetchLists = () => {
    return dispatch => {
        dispatch(fetchListsPending());
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        fetch(`${apiUrl}/lists`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchListsSuccess(res));
            return res;
        })
        .then(res => {
            dispatch(setPageName("All Boards"));
            return res;
        })
        .catch(error => {
            dispatch(fetchListsError(error));
        })
    }
}

export const fetchListsByBoardId = (boardId) => {
    return (dispatch, getState) => {
        dispatch(fetchListsPending());
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        fetch(`${apiUrl}/lists/ofBoard/${boardId}`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchListsSuccess(res));
            return res;
        })
        .then(res => {
            const board = [...getState().boards.boards].find(board => board.id === boardId);
            const boardTitle = board ? board.title : '';
            dispatch(setPageName(boardTitle));
            return res;
        })
        .catch(error => {
            dispatch(fetchListsError(error));
        })
    }
}

export const addListPending = () => {
    return {
        type: CONSTANTS.ADD_LIST_PENDING
    }
}

export const addListSuccess = () => {
    return {
        type: CONSTANTS.ADD_LIST_SUCCESS
    }
}

export const addListError = (error) => {
    return {
        type: CONSTANTS.ADD_LIST_FAILURE,
        payload: { error }
    }
}


export const addList = (boardId, title) => {
    return (dispatch, getState) => {
        dispatch(addListPending());

        const boardLists = [...getState().lists.lists].filter(list => list.boardId === boardId);

        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: uuidv4(), boardId: boardId, index: boardLists.length, title: title.trim() })
        };
        fetch(`${apiUrl}/lists`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(addListSuccess());
            return res;
        })// TODO: Sort lists
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(addListError(error));
        })
    }
};


export const updateListPending = () => {
    return {
        type: CONSTANTS.UPDATE_LIST_PENDING
    }
}

export const updateListSuccess = () => {
    return {
        type: CONSTANTS.UPDATE_LIST_SUCCESS
    }
}

export const updateListError = (error) => {
    return {
        type: CONSTANTS.UPDATE_LIST_FAILURE,
        payload: { error }
    }
}
export const updateList = (listId, boardId, title) => {
    return (dispatch, getState) => {
        dispatch(updateListPending());
        const list = getState().lists.lists.find(list => list.id === listId);
        const requestOptions = {
            method: 'PUT',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: list.id, boardId: boardId, index: list.index, title: title.trim() })
        };
        fetch(`${apiUrl}/lists/${listId}`, requestOptions)
        .then(res => {
            if(res.status !== 204) return res.json()
            else return { }
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(updateListSuccess());
            return res;
        })
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(updateListError(error));
        })
    }
};

export const deleteListPending = () => {
    return {
        type: CONSTANTS.DELETE_LIST_PENDING
    }
}

export const deleteListSuccess = () => {
    return {
        type: CONSTANTS.DELETE_LIST_SUCCESS
    }
}

export const deleteListError = (error) => {
    return {
        type: CONSTANTS.DELETE_LIST_FAILURE,
        payload: { error }
    }
}
export const deleteList = (listId) => {
    return (dispatch, getState) => {
        dispatch(deleteListPending());
        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        fetch(`${apiUrl}/lists/${listId}`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(deleteListSuccess());
            return res;
        })
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(deleteListError(error));
        })
    }
};

export const sortListPending = () => {
    return {
        type: CONSTANTS.SORT_LIST_PENDING
    }
}

export const sortListSuccess = () => {
    return {
        type: CONSTANTS.SORT_LIST_SUCCESS
    }
}

export const sortListError = (error) => {
    return {
        type: CONSTANTS.SORT_LIST_FAILURE,
        payload: { error }
    }
}

export const sort = (oldIndex, newIndex) => {
    return (dispatch, getState) => {
        dispatch(sortListPending());

        const lists = [...getState().lists.lists];
        const boardLists = lists.filter(list => getState().boards.currentBoardId === list.boardId);
        boardLists.sort((a,b) => a.index - b.index);

        const newLists = arrayMove(boardLists, oldIndex, newIndex);

        const objectToSend = { };
        newLists.forEach((list, index) => {
            list.index = index;
            objectToSend[list.id] = index;
        })

        newLists.forEach((list) => {
            lists.forEach(list2 => {
                if(list.id === list2.id)
                {
                    list2.index = list.index;
                }
            })
        })

        dispatch(updateListUIImmediate(lists));

        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(objectToSend)
        };
        fetch(`${apiUrl}/lists/sort`, requestOptions)
        .then(res => {
            if(res.status !== 204) return res.json()
            else return { }
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(sortListSuccess());
            return res;
        })
        .then(res => {
            getState().boards.currentBoardId ? dispatch(fetchListsByBoardId(getState().boards.currentBoardId)) : dispatch(fetchLists());
            return res;
        })
        .catch(error => {
            dispatch(sortListError(error));
        })
    }
}

export const updateListUIImmediate = (lists) => {
    return {
        type: CONSTANTS.UPDATE_LIST_UI_IMMEDIATE,
        payload: { lists: lists }
    }
}