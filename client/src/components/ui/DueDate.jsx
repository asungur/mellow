import React from 'react';

const DueDate = ({ card }) => {
  const dueDate = new Date(card.createdAt);
  const datePassed = dueDate ? Date.now() > dueDate : false;

  return (
    <li className="due-date-section">
    <h3>Due Date</h3>
    <div id="dueDateDisplay" className="overdue completed">
      <input
        id="dueDateCheckbox"
        type="checkbox"
        className="checkbox"
        checked=""
        onChange={() => {}}
        value={''}
      />
      {dueDate && dueDate.toDateString()} <span>{datePassed && '(past due)'}</span>
    </div>
  </li>
  )
}

export default DueDate;
