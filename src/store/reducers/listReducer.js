import { CONSTANTS } from '../actions/rootActions';
import arrayMove from 'array-move';
import { v4 as uuidv4 } from 'uuid';

export let initialState = [
    {
        id: "list1",
        boardId: "board1",
        index: 0,
        title: "list1"
    },
    {
        id: "list2",
        boardId: "board1",
        index: 1,
        title: "list2"
    },
    {
        id: "list3",
        boardId: "board1",
        index: 2,
        title: "list3"
    },
    {
        id: "list4",
        boardId: "board1",
        index: 3,
        title: "list4"
    },
    {
        id: "list5",
        boardId: "board2",
        index: 4,
        title: "list5"
    }
]

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.LIST_DRAG_HAPPENED: {
            const { items, oldIndex, newIndex } = action.payload;

            let newState = arrayMove(items, oldIndex, newIndex);
            newState.forEach((list,index) => list.index = index);

            return newState;
        }
        case CONSTANTS.ADD_LIST: {
            let newState = [...state];
            const lists = newState.filter(list => action.payload.boardId === list.boardId);

            let lastIndex = 0;
            lists.forEach(item => {
                if (item.index > lastIndex) lastIndex = item.index;
            });
            newState.forEach(item => {
                if (item.index >= lastIndex) item.index++;
            });
            const newList = {
                id: uuidv4(),
                boardId: action.payload.boardId,
                index: lastIndex,
                title: action.payload.title,
            }
            return [...newState, newList];
        }
        case CONSTANTS.UPDATE_LIST: {
            const newState = [...state];
            // const lists = newState.filter(list => action.payload.boardId === list.boardId);
            const list = newState.find(list => list.id === action.payload.listId);
            const index = newState.indexOf(list);
            newState.splice(index, 1);

            // let firstIndex = newState.length;
            // lists.forEach(item => {
            //     if (item.index < firstIndex) firstIndex = item.index;
            // });
            // newState.forEach(item => {
            //     if (item.index >= firstIndex) item.index++;
            // });
            list.title = action.payload.title.trim();
            list.boardId = action.payload.boardId.trim();
            // list.index = firstIndex;
            newState.splice(index, 0, list);
            console.log(list);
            return newState;
        }
        case CONSTANTS.DELETE_LIST: {
            const newState = [...state];
            const list = newState.find(list => list.id === action.payload.listId);
            const index = newState.indexOf(list);
            newState.splice(index, 1);
            newState.forEach(item => {
                if (item.index > list.index) item.index--;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default listReducer;