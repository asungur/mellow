import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "../../actions/CardActions";

const CardDescription = ({ card }) => {
  const initialValue = card.description ? card.description :'Add description here';
  const [ description, setDescription ] = useState(initialValue);
  const [showEditDescription, setShowEditDescription] = useState(false);
  const dispatch = useDispatch();

  const toggleEditDescription = (e) => {
    e.preventDefault();
    setShowEditDescription(!showEditDescription);
  }

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    toggleEditDescription(e);
    setDescription(initialValue);
  }

  const handleSaveEdit = (e) => {
    toggleEditDescription(e);
    dispatch(updateCard({ id: card._id, title: card.title, description }));
  }

  const changeDescription = (e) => {
    e.preventDefault();
    setDescription(e.target.value);
  }

  return (
    <form className="description">
      <p>Description</p>
      {showEditDescription ?
      <>
        <textarea
          value={description}
          onChange={changeDescription}
          onBlur={handleSaveEdit}
          className="textarea-toggle"
          rows="1"
          autoFocus>
        </textarea>
        <div>
          <div onClick={handleSaveEdit} className="button" value="Save">
            Save
          </div>
          <i onMouseDown={handleCancelEdit} className="x-icon icon"></i>
        </div>
      </>
      :
      <>
        <span onClick={toggleEditDescription} id="description-edit" className="link">Edit</span>
        <p className="textarea-overlay">
          {description}
        </p>
      </>
      }

      <p id="description-edit-options" className="hidden">
        You have unsaved edits on this field.{" "}
        <span className="link">View edits</span> -{" "}
        <span className="link">Discard</span>
      </p>
    </form>
  )
}



export default CardDescription;