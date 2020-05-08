import { CONSTANTS } from './rootActions';
import { sort as listSort, deleteList } from './listActions';


export const addBoard = (title) => {
    return {
        type: CONSTANTS.ADD_BOARD,
        payload: { 
            title
        }
    };
};

export const sort = (items, oldIndex, newIndex) => {
    return (dispatch, getState) =>  {
        let lists = [...getState().lists];

        dispatch({
            type: CONSTANTS.BOARD_DRAG_HAPPENED,
            payload: {
                items, oldIndex, newIndex
            }
        });
        let boards = [...getState().boards];
        boards.sort((a,b) => a.index - b.index);
        let index = 0;

        boards.forEach(board => {
            const boardLists = lists.filter(list => list.boardId === board.id);
            boardLists.sort((a,b) => a.index - b.index);
            boardLists.forEach((list) => {
                list.index = index++;
            })
        })
        lists.sort((a,b) => a.index - b.index);

        dispatch(listSort(lists, 0, 0));
    }
}

export const updateBoard = (boardId, title) => {
    return {
        type: CONSTANTS.UPDATE_BOARD,
        payload: {
            boardId, title
        }
    }
}

export const deleteBoard = (boardId) => {
    return (dispatch, getState) => {

        const lists = [...getState().lists];
        lists.forEach(list => {
            if(list.boardId === boardId){
                dispatch(deleteList(list.id));
            }
        })
        
        dispatch({
            type: CONSTANTS.DELETE_BOARD,
            payload: {
                boardId
            }
        });

    }
}