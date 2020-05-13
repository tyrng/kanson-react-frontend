import { CONSTANTS } from '../actions/rootActions';

const initialState = {
    pending: false,
    cards: [],
    error: null,
    updating: false,
    adding: false,
    deleting: false,
    sorting: false
}

const cardReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.FETCH_CARDS_PENDING:
            return {
                ...state,
                pending: true
            }
        case CONSTANTS.FETCH_CARDS_SUCCESS:
            return {
                ...state,
                pending: false,
                cards: action.payload.cards
            }
        case CONSTANTS.FETCH_CARDS_FAILURE:
            return {
                ...state,
                pending: false,
                error: action.payload.error
            }
        case CONSTANTS.ADD_CARD_PENDING:
            return {
                ...state,
                adding: true
            }
        case CONSTANTS.ADD_CARD_SUCCESS:
            return {
                ...state,
                adding: false
            }
        case CONSTANTS.ADD_CARD_FAILURE:
            return {
                ...state,
                adding: false,
                error: action.payload.error
            }
        case CONSTANTS.UPDATE_CARD_PENDING:
            return {
                ...state,
                updating: true
            }
        case CONSTANTS.UPDATE_CARD_SUCCESS:
            return {
                ...state,
                updating: false
            }
        case CONSTANTS.UPDATE_CARD_FAILURE:
            return {
                ...state,
                updating: false,
                error: action.payload.error
            }
        case CONSTANTS.DELETE_CARD_PENDING:
            return {
                ...state,
                deleting: true
            }
        case CONSTANTS.DELETE_CARD_SUCCESS:
            return {
                ...state,
                deleting: false
            }
        case CONSTANTS.DELETE_CARD_FAILURE:
            return {
                ...state,
                deleting: false,
                error: action.payload.error
            }
        case CONSTANTS.UPDATE_CARD_UI_IMMEDIATE:
            return {
                ...state,
                sorting: state.sorting,
                cards: action.payload.cards != null ? [...action.payload.cards] : [...state.cards]
            }
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
        default:
            return state;
    }
};

export default cardReducer;