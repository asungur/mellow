import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

function getCardSuccess(card) {
  return { type: types.GET_CARD_SUCCESS, card: card };
}

function addCardSuccess(card) {
  return { type: types.ADD_CARD_SUCCESS, card: card };
}

export function getCard(id, callback) {
  return function(dispatch) {
    apiClient.getCard(id, (data) => {
      dispatch(getCardSuccess(data.card))
      if(callback) { callback(data) }
    });
  };
}

export function addCard(title, listId, boardId, callback) {
  return function(dispatch) {
    const newCard = { card: { title, listId, boardId }};
    apiClient.addCard(newCard, (data) => {
      dispatch(addCardSuccess(data.card));
      if (callback) { callback() }
    });
  };
}
