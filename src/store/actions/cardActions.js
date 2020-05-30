import { CONSTANTS } from '../actions/rootActions';
import {apiUrl} from '../../config/apiConfig';
import { authHeader } from '../../helpers/authHeader';
import { v4 as uuidv4 } from 'uuid';
import {updateListUIImmediate} from '../../store/actions/listActions'

export const fetchCardsPending = () => {
    return {
        type: CONSTANTS.FETCH_CARDS_PENDING
    }
}

export const fetchCardsSuccess = (cards) => {
    return {
        type: CONSTANTS.FETCH_CARDS_SUCCESS,
        payload: { cards }
    }
}

export const fetchCardsError = (error) => {
    return {
        type: CONSTANTS.FETCH_CARDS_FAILURE,
        payload: { error }
    }
}

export const fetchCards = () => {
    return dispatch => {
        dispatch(fetchCardsPending());
        const requestOptions = {
            method: 'GET',
            headers: authHeader()
        };
        fetch(`${apiUrl}/cards`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchCardsSuccess(res));
            return res;
        })
        .catch(error => {
            dispatch(fetchCardsError(error));
        })
    }
}

export const addCardPending = () => {
    return {
        type: CONSTANTS.ADD_CARD_PENDING
    }
}

export const addCardSuccess = () => {
    return {
        type: CONSTANTS.ADD_CARD_SUCCESS
    }
}

export const addCardError = (error) => {
    return {
        type: CONSTANTS.ADD_CARD_FAILURE,
        payload: { error }
    }
}

export const addCard = (listId, text) => {
    return (dispatch, getState) => {
        dispatch(addCardPending());


        const allCards = [...getState().cards.cards];
        const listCards = [...allCards].filter(card => card.listId === listId);
        const newCard = {
            id: uuidv4(), listId: listId, index: listCards.length, text: text.trim()
        }
        const cards = [...allCards, newCard];

        dispatch(updateCardUIImmediate(cards));

        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(newCard)
        };
        fetch(`${apiUrl}/cards`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(addCardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchCards());
            return res;
        })
        .then(res => {
            dispatch(updateListUIImmediate());
            return res;
        })
        .catch(error => {
            dispatch(addCardError(error));
        })
    }
};

export const updateCardPending = () => {
    return {
        type: CONSTANTS.UPDATE_CARD_PENDING
    }
}

export const updateCardSuccess = () => {
    return {
        type: CONSTANTS.UPDATE_CARD_SUCCESS
    }
}

export const updateCardError = (error) => {
    return {
        type: CONSTANTS.UPDATE_CARD_FAILURE,
        payload: { error }
    }
}


export const updateCard = (cardId, text) => {
    return (dispatch, getState) => {
        dispatch(updateCardPending());
        const allCards = [...getState().cards.cards];
        const card = allCards.find(card => card.id === cardId);

        const requestOptions = {
            method: 'PUT',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: card.id, listId: card.listId, index: card.index, text: text.trim() })
        };
        fetch(`${apiUrl}/cards/${cardId}`, requestOptions)
        .then(res => {
            if(res.status !== 204) return res.json()
            else return { }
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(updateCardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchCards());
            return res;
        })
        .catch(error => {
            dispatch(updateCardError(error));
        })
    }
}

export const deleteCardPending = () => {
    return {
        type: CONSTANTS.DELETE_CARD_PENDING
    }
}

export const deleteCardSuccess = () => {
    return {
        type: CONSTANTS.DELETE_CARD_SUCCESS
    }
}

export const deleteCardError = (error) => {
    return {
        type: CONSTANTS.DELETE_CARD_FAILURE,
        payload: { error }
    }
}

export const deleteCard = (cardId) => {
    return (dispatch, getState) => {
        dispatch(deleteCardPending());
        const allCards = [...getState().cards.cards];
        const cards = allCards.filter(card => card.id !== cardId);

        dispatch(updateCardUIImmediate(cards));

        const requestOptions = {
            method: 'DELETE',
            headers: authHeader(),
        };
        fetch(`${apiUrl}/cards/${cardId}`, requestOptions)
        .then(res => {
            return res.json()
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(deleteCardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchCards());
            return res;
        })
        .catch(error => {
            dispatch(deleteCardError(error));
        })
    }
}

export const sortCardPending = () => {
    return {
        type: CONSTANTS.SORT_CARD_PENDING
    }
}

export const sortCardSuccess = () => {
    return {
        type: CONSTANTS.SORT_CARD_SUCCESS
    }
}

export const sortCardError = (error) => {
    return {
        type: CONSTANTS.SORT_CARD_FAILURE,
        payload: { error }
    }
}

export const sort = (droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId) => {
    return (dispatch, getState) => {
        dispatch(sortCardPending());

        const newState = [...getState().cards.cards];

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

        const finalCards = sameCards ? [...endCards, ...otherCards] : [...startCards, ...endCards, ...otherCards];

        const objectToSend = { };
        
        finalCards.forEach(card => {
            objectToSend[card.id] = { parentId: card.listId, index: card.index };
        })

        dispatch(updateCardUIImmediate(finalCards));

        const requestOptions = {
            method: 'POST',
            headers: { ...authHeader(), 'Content-Type': 'application/json' },
            body: JSON.stringify(objectToSend)
        };
        fetch(`${apiUrl}/cards/sort`, requestOptions)
        .then(res => {
            if(res.status !== 204) return res.json()
            else return { }
        })
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(sortCardSuccess());
            return res;
        })
        .then(res => {
            dispatch(fetchCards());
            return res;
        })
        .catch(error => {
            dispatch(sortCardError(error));
        })
    }
}

export const updateCardUIImmediate = (cards) => {
    return {
        type: CONSTANTS.UPDATE_CARD_UI_IMMEDIATE,
        payload: { cards: cards }
    }
}