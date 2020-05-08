import { CONSTANTS } from '../actions/rootActions';


export const addList = (boardId, title) => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: {
            boardId, title
        }
    };
};

export const sort = (items, oldIndex, newIndex) => {
    return {
        type: CONSTANTS.LIST_DRAG_HAPPENED,
        payload: {
            items, oldIndex, newIndex
        }
    }
}
export const updateList = (listId, boardId, title) => {
    return {
        type: CONSTANTS.UPDATE_LIST,
        payload: {
            listId, boardId, title
        }
    };
};
export const deleteList = (listId) => {
    return {
        type: CONSTANTS.DELETE_LIST,
        payload: {
            listId
        }
    };
};