import React from 'react';
import LabelsPopover from "./LabelsPopover";

const Labels = ({ card, handleLabelPopOver, showPopover }) => {

  return (
    <li className="labels-section">
      <h3>Labels</h3>
      {card.labels.map(label =>
        <div key={label._id} className="member-container">
          <div className={`${label.color} label colorblindable`}>{label.name}</div>
        </div>
      )}
      <div className="member-container">
        <i className="plus-icon sm-icon" onClick={handleLabelPopOver}></i>
      </div>
      {showPopover ? <LabelsPopover labels={card.labels}/> : null }
    </li>
  )
}

export default Labels;
