import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateList } from "../../actions/ListActions";
import CardPreview from "./CardPreview";
import { addCard } from "../../actions/CardActions";

const List = ({ list, setActiveList, activeList }) => {
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [ showEditListTitle, setShowEditListTitle ] = useState(false);
  const [ showAddCardForm, setShowAddCardForm ] = useState(false);
  const [ editTitle, setEditTitle ] = useState(list.title);
  const [ newCardTitle, setNewCardTitle ] = useState('');

  useEffect(() => {
    if (activeList === list._id) {
      inputRef.current.focus();
      setEditTitle(list.title);
    }
  }, [list.title, showAddCardForm])

  const handleChangeListTitle = e => {
    e.preventDefault();
    setEditTitle(e.target.value);
  };

  const toggleEditTitle = e => {
    e.preventDefault();
    setShowEditListTitle(!showEditListTitle);
  };

  const handleSaveNewTitle = () => {
    dispatch(updateList({ id: list._id, title: editTitle }))
  };

  const handleKeyPress = e => {
    e.stopPropagation()
    if (e.key === 'Enter') {
      e.target.blur();
    } else if (e.key === 'Escape') {
      toggleEditTitle(e)
    }
  };

  const toggleAddCardForm = () => {
    setActiveList(list._id);
    setShowAddCardForm(!showAddCardForm);
  }

  const resetAddCardForm = () => {
    setActiveList(null);
    setNewCardTitle('');
    // toggleAddCardForm();
  }

  const handleAddCardInput = e => {
    e.preventDefault();
    setNewCardTitle(e.target.value);
  }

  const handleAddNewCard = e => {
    e.preventDefault();
    dispatch(addCard(newCardTitle, list._id, list.boardId, resetAddCardForm));
  }

  const cards = useSelector(state => {
    return state.cards.filter(card => card.listId === list._id && !card.archived)
  });

  return (
    <div className={activeList === list._id ? "list-wrapper add-dropdown-active" : "list-wrapper"} key={list._id}>
      <div className="list-background">
        <div className="list">
          <a className="more-icon sm-icon" href=""></a>
          <div>
            {showEditListTitle ?
              <input className="list-title"
                type="text" value={editTitle} onBlur={handleSaveNewTitle}
                onChange={handleChangeListTitle} autoFocus={true}
                onKeyUp={handleKeyPress} />
              :
              <p className="list-title" onClick={toggleEditTitle}>{editTitle}</p>
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
              <CardPreview key={card._id} card={card}/>
            )}
          </div>
          <div className={`add-dropdown add-bottom ${activeList === list._id ? 'active-card' : ''}`}>
              <div className="card">
                <div className="card-info"></div>
                <textarea name="add-card" ref={inputRef} value={newCardTitle} 
                  onChange={handleAddCardInput}></textarea>
                <div className="members"></div>
              </div>
              <a className="button" onClick={handleAddNewCard}>Add</a>
              <i className="x-icon icon" onClick={resetAddCardForm}></i>
              <div className="add-options">
                <span>...</span>
              </div>
            </div>
            <div className="add-card-toggle" data-position="bottom" onClick={toggleAddCardForm}>
              Add a card...
            </div>
        </div>
      </div>
    </div>
  )
};

export default List;
