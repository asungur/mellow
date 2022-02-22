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
    case "GET_CARD_SUCCESS": {
      const retrievedCard = action.card

      if (state.find(card => card._id === retrievedCard._id)) {
        return state.map(card => card._id === retrievedCard._id ? retrievedCard : card )
      }
      return state.concat(retrievedCard)
    }
    case "ADD_CARD_SUCCESS": {
      const newCard = action.card;
      return state.concat(newCard);
    }
    default:
      return state;
  }
}
