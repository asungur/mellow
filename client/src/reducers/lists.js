export default function lists(state = [], action) {
  switch (action.type) {
    case "GET_BOARD_SUCCESS": {
      const newLists = action.board.lists;
      let newState = state.slice();

      newLists.forEach(listItem => {
        const {cards, ...listWithoutCards} = listItem

        if (newState.find(list => list._id === listItem._id)) {
          newState = newState.map(list => list._id === listItem._id ? listWithoutCards : list);
        } else {
          newState = newState.concat(listWithoutCards);
        }
      })

      return newState;
    }
    case "CREATE_LIST_SUCCESS": {
      const newList = action.list;
      return state.concat(newList);
    }
    default:
      return state;
  }
}