import React from "react";
import { Link } from 'react-router-dom';

const CardPreview = ({ card }) => {
  // Date to be updated
  let dueDate;
  if (card.dueDate) {
    dueDate = new Date(card.dueDate)
  }

  return (
    <div className="card-background">
      <Link to={`/cards/${card._id}`}>
        <div className="card">
          <i className="edit-toggle edit-icon sm-icon"></i>
          <div className="card-info">
            {card.labels.map(label =>
              <div key={label} className={`card-label ${label} colorblindable`}></div>
            )}
            <p>
              {card.title}
            </p>
          </div>
          <div className="card-icons">
            {dueDate &&
              <i className="clock-icon sm-icon overdue-recent completed">
                {dueDate.toDateString()}
              </i>
            }
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CardPreview;
