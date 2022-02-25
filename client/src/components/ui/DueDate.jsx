import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import DueDateForm from './DueDateForm';
import { updateCard } from "../../actions/CardActions";

function isValidDate(d) {
  return d instanceof Date && !isNaN(d);
}

const DueDate = ({ card }) => {
  let datePassed;
  let dueDate = new Date(card.dueDate);
  if (isValidDate(dueDate)) {
    datePassed = new Date() > dueDate;
  }
  const [showPopover, setShowPopover] = useState(false);
  const dispatch = useDispatch();

  const handleShowPopoever = (e) => {
    e.stopPropagation();
    setShowPopover(!showPopover)
  }

  const handleSubmit = (e) => {
    const formDate = new Date(e.target.querySelector("#date-input").value);

    dispatch(updateCard({ id: card._id, title: card.title, dueDate: formDate }))
  }

  return (
    <li className="due-date-section">
    <h3>Due Date</h3>
    <div id="dueDateDisplay" className="overdue completed" onClick={handleShowPopoever}>
      <input
        id="dueDateCheckbox"
        type="checkbox"
        className="checkbox"
        value={''}
      />
      {isValidDate(dueDate) && dueDate.toDateString()} <span>{datePassed && '(past due)'}</span>
    </div>
    { showPopover ?
        <DueDateForm
          onClose={() => setShowPopover(false)}
          onSubmit={handleSubmit}
          dueDate={dueDate}
          card={card}
        />
        :
        null
      }
  </li>
  )
}

export default DueDate;
