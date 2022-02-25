import React from "react";
import { Link } from 'react-router-dom';

const CardPreview = ({ card }) => {
  // Date to be updated
  const dueDate = new Date(card.createdAt)

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
            <i className="clock-icon sm-icon overdue-recent completed">
              {dueDate && dueDate.toDateString()}
            </i>
            <i className="description-icon sm-icon"></i>
            <i className="comment-icon sm-icon"></i>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CardPreview;
