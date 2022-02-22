export default function boards(state = [], action) {
  switch (action.type) {
    case "FETCH_BOARDS_SUCCESS": {
      return action.boards;
    }
    case "CREATE_BOARD_SUCCESS": {
      const newBoard = action.board;
      return state.concat(newBoard);
    }
    case "GET_BOARD_SUCCESS": {
      const {lists, ...boardWithoutLists} = action.board

      if (state.find(board => board._id === boardWithoutLists._id)) {
        return state.map(board => board._id === boardWithoutLists._id ? boardWithoutLists : board);
      }
      return state.concat(boardWithoutLists)
    }
    default:
      return state;
  }
}
