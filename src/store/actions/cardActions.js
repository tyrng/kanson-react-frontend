import { CONSTANTS } from '../actions/rootActions';


export const addCard = (listID, text) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: { 
            text, listID 
        }
    };
};

export const sort = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId) => {
    return {
        type: CONSTANTS.CARD_DRAG_HAPPENED,
        payload: {
            droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId
        }
    }
}

export const updateCard = (cardId, text) => {
    return {
        type: CONSTANTS.UPDATE_CARD,
        payload: {
            cardId, text
        }
    }
}

export const deleteCard = (cardId) => {
    return {
        type: CONSTANTS.DELETE_CARD,
        payload: {
            cardId
        }
    }
}