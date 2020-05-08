import { CONSTANTS } from '../actions/rootActions';
import { v4 as uuidv4 } from 'uuid';

export let initialState = [
    {
        id: uuidv4(),
        listId: "list1",
        index: 0,
        text: `Card 1`
    },
    {
        id: uuidv4(),
        listId: "list1",
        index: 1,
        text: `Card 2`
    },
    {
        id: uuidv4(),
        listId: "list2",
        index: 0,
        text: `Card 3`
    },
    {
        id: uuidv4(),
        listId: "list2",
        index: 1,
        text: `Card 4`
    },
    {
        id: uuidv4(),
        listId: "list3",
        index: 0,
        text: `Card 5`
    },
    {
        id: uuidv4(),
        listId: "list3",
        index: 1,
        text: `Card 6`
    },
    {
        id: uuidv4(),
        listId: "list4",
        index: 0,
        text: `Card 7`
    },
    {
        id: uuidv4(),
        listId: "list4",
        index: 1,
        text: `Card 8`
    },
    {
        id: uuidv4(),
        listId: "list5",
        index: 0,
        text: `Card 9`
    },
]

const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.CARD_DRAG_HAPPENED: {
            const { droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId } = action.payload;
            const newState = [...state];

            const selectedCard = newState.find(card => card.id === draggableId);

            newState.splice(newState.indexOf(selectedCard), 1);
            
            const startCards = newState.filter(card => card.listId === droppableIdStart);
            const endCards = newState.filter(card => card.listId === droppableIdEnd);
            const otherCards = newState.filter(card => card.listId !== droppableIdStart && card.listId !== droppableIdEnd);

            const sameCards = JSON.stringify(startCards) === JSON.stringify(endCards);

            for(let i = 0; i < startCards.length; i++) {
                if(startCards[i].index > droppableIndexStart) {
                    sameCards ? endCards[i].index-- : startCards[i].index--;
                }
            }

            for(let i = 0; i < endCards.length; i++) {
                if(endCards[i].index >= droppableIndexEnd) {
                    endCards[i].index++;
                }
            }
            selectedCard.index = droppableIndexEnd;
            selectedCard.listId = droppableIdEnd;
            endCards.splice(endCards.length, 0, selectedCard);

            return sameCards ? [...endCards, ...otherCards] : [...startCards, ...endCards, ...otherCards];
        }
        case CONSTANTS.ADD_CARD: {
            const cards = state.filter(card => action.payload.listID === card.listId);
            const newCard = {
                id: uuidv4(),
                listId: action.payload.listID,
                index: cards.length,
                text: `${action.payload.text.trim()}`
            };
            const newState = [...state, newCard];
            
            return newState;
        }
        case CONSTANTS.UPDATE_CARD: {
            const newState = [...state];
            const card = newState.find(card => card.id === action.payload.cardId);
            const index = newState.indexOf(card);
            newState.splice(index, 1);
            card.text = action.payload.text.trim();
            newState.splice(index, 0, card);
            return newState;
        }
        case CONSTANTS.DELETE_CARD: {
            const newState = [...state];
            const card = newState.find(card => card.id === action.payload.cardId);
            const cards = newState.filter(item => item.listId === card.listId);
            const index = newState.indexOf(card);
            newState.splice(index, 1);
            cards.forEach(item => {
                if (item.index > card.index) item.index--;
            });
            return newState;
        }
        default:
            return state;
    }
};

export default listReducer;