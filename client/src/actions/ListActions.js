import apiClient from "../lib/ApiClient";
import * as types from "../constants/ActionTypes";

function createListSuccess(list) {
  return { type: types.CREATE_LIST_SUCCESS, list };
}

export function createList(title, boardId) {
  return function(dispatch) {
    apiClient.createList({ list: { title, boardId }}, data => {
      dispatch(createListSuccess(data.list));
    });
  };
}
