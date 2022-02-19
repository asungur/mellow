import React, { useState } from "react";
import { useSelector } from "react-redux";
// import cardReducer from "../../reducers/cards";
import CardPreview from "./CardPreview";

const List = ({ list }) => {
  const [ showEditListTitle, setShowEditListTitle ] = useState(false);
  const [ editTitle, setEditTitle ] = useState(list.title);

  const handleChangeListTitle = e => {
    e.preventDefault();
    setEditTitle(e.target.value);
  };

  const toggleEditTitle = e => {
    e.preventDefault();
    setShowEditListTitle(!showEditListTitle);
  };

  const handleSaveNewTitle = () => {
    console.log('hello');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
    }
  };

  const cards = useSelector(state => {
    return state.cards.filter(card => card.listId === list._id)
  });

  return (
    <div className="list-wrapper" key={list._id}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {showEditListTitle ?
              <input className="list-title" 
                type="text" value={editTitle} onBlur={handleSaveNewTitle}
                onChange={handleChangeListTitle} autoFocus={true} 
                onKeyPress={handleKeyPress} />
              :
              <p className="list-title" onClick={toggleEditTitle}>{list.title}</p>
            }
          </div>
          <div className="add-dropdown add-top">
            <div className="card"></div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div id="cards-container" data-id="list-1-cards">
            {cards.map(card =>
              <CardPreview key={card._id} content={card}/>
            )}
          </div>
          <div className="add-dropdown add-bottom">
            <div className="card">
              <div className="card-info"></div>
              <textarea name="add-card"></textarea>
              <div className="members"></div>
            </div>
            <a className="button">Add</a>
            <i className="x-icon icon"></i>
            <div className="add-options">
              <span>...</span>
            </div>
          </div>
          <div className="add-card-toggle" data-position="bottom">
            Add a card...
          </div>
        </div>
      </div>
    </div>
  )
};

export default List;
