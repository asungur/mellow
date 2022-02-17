export default function cards(state = [], action) {
  switch (action.type) {
    case "GET_BOARD_SUCCESS": {
      let cardsArr = [];
      const newLists = action.board.lists;

      let newCards = newLists.map(list => {
        return list.cards
      }).flat();

      state.forEach(cardItem => {
        const updatedCard = newCards.find(card => card._id === cardItem._id);
        if (updatedCard) {
          cardsArr = [...cardsArr, updatedCard];
          newCards = newCards.filter(card => card._id !== updatedCard._id)
        } else {
          cardsArr = [...cardsArr, cardItem]
        }
      })

      return cardsArr.concat(newCards);
    }
    default:
      return state;
  }
}