import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";


function getListSuccess(list) {
  return { type: types.GET_LIST_SUCCESS, list };
}

function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

function updateListSuccess(list) {
  return { type: types.UPDATE_LIST_SUCCESS, list };
}

export function getList(listId) {
  return function(dispatch) {
    apiClient.getList(listId, data => {
      dispatch(getListSuccess(data.list));
    })
  }
}

export function updateList(list) {
  return function(dispatch) {
    apiClient.updateList(list.id, { list }, data => {
      dispatch(updateListSuccess(data.list));
    })
  }
}

export function createList(title, boardId) {
  return function(dispatch) {
    apiClient.createList({ list: { title, boardId }}, data => {
      dispatch(createListSuccess(data.list));
    });
  };
}
