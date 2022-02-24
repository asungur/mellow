import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

function getCardSuccess(card) {
  return { type: types.GET_CARD_SUCCESS, card: card };
}

function addCardSuccess(card) {
  return { type: types.ADD_CARD_SUCCESS, card: card };
}

function updateCardSuccess(card) {
  return { type: types.UPDATE_CARD_SUCCESS, card: card };
}

function addCommentSuccess(comment) {
  return { type: types.CREATE_COMMENT_SUCCESS, comment: comment}
}

export function getCard(id, callback) {
  return function(dispatch) {
    apiClient.getCard(id, (data) => {
      dispatch(getCardSuccess(data.card))
      if (callback) { callback(data.card) }
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

export function updateCard(card) {
  return function(dispatch) {
    apiClient.updateCard(card.id, { card }, (data) => {
      dispatch(updateCardSuccess(data.card));
    })
  }
}

export function addComment(content, boardId, listId, cardId, callback) {
  return function(dispatch) {
    const newComment = { comment: { content, boardId, listId, cardId } }
    apiClient.addComment(newComment, (data) => {
      dispatch(addCommentSuccess(data.comment))
      if (callback) { callback() }
    })
  }
}
