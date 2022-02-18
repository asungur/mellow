import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

function createListSuccess(list) {
  return { type: 'CREATE_LIST_SUCCESS', list };
}

export function createList(title, boardId) {
  return function(dispatch) {
    apiClient.createList({ list: { title, boardId }}, list => {
      dispatch(createListSuccess(list));
    });
  };
}