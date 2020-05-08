import { CONSTANTS } from '../actions/rootActions';
import arrayMove from 'array-move';
import { v4 as uuidv4 } from 'uuid';

export let initialState = [
    {
        id: "board1",
        index: 0,
        title: "Board 1",
    },
    {
        id: "board2",
        index: 1,
        title: "Board 2",
    },
    {
        id: "board23",
        index: 2,
        title: "Some really really really really long name of a board",
    },
]

const boardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.BOARD_DRAG_HAPPENED: {
            const { items, oldIndex, newIndex } = action.payload;
            let newState = [...state];

            newState = arrayMove(items, oldIndex, newIndex);
            newState.forEach((board,index) => board.index = index);

            return newState;
        }
        case CONSTANTS.ADD_BOARD: {
            const newBoard = {
                id: uuidv4(),
                index: state.length,
                title: `${action.payload.title.trim()}`
            };
            const newState = [...state, newBoard];
            
            return newState;
        }
        case CONSTANTS.UPDATE_BOARD: {
            
            const newState = [...state];
            const board = newState.find(board => board.id === action.payload.boardId);

            board.title = action.payload.title.trim();
            return newState;
        }
        case CONSTANTS.DELETE_BOARD: {
            const newState = [...state];
            const board = newState.find(board => board.id === action.payload.boardId);
            const index = newState.indexOf(board);
            newState.splice(index, 1);
            newState.forEach(item => {
                if (item.index > board.index) item.index--;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default boardReducer;