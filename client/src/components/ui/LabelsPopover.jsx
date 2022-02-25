import React from "react";
import { updateCard } from "../../actions/CardActions";
import { useDispatch } from "react-redux";

const LabelsPopover = ({ card }) => {
  const labels = ["green", "yellow", "orange", "red", "purple", "blue"]
  const dispatch = useDispatch();

  const handleToggleLabel = (e) => {
    let selectedColor = labels[Number(e.target.parentElement.getAttribute('data-id'))];
    let colorExists = card.labels.includes(selectedColor)
    let newLabels;
    if (colorExists) {
      newLabels = card.labels.filter(l => l !== selectedColor)
    } else {
      newLabels = [...card.labels, selectedColor]
    }
    dispatch(updateCard({ id: card._id, title: card.title, labels: newLabels }))
  }

  return (
    <div className="popover labels">
      <div id="add-options-labels-dropdown">
        <header>
          <span>Labels</span>
          <a href="#" className="icon-sm icon-close"></a>
        </header>
        <div className="content">
          <input
            className="dropdown-input"
            placeholder="Search labels..."
            type="text"
          />
          <div className="labels-search-results">
            <ul className="label-list">
              {labels.map((label, i) =>
                <li key={label}>
                  <div className={`${label} colorblindable`} data-id={i}>
                    <i className="check-icon sm-icon" onClick={handleToggleLabel} ></i>
                  </div>
                  <div className={`label-background ${label}`}></div>
                  <div className="label-background-overlay"></div>
                  <i className="edit-icon icon not-implemented"></i>
                </li>
              )}
            </ul>
            <ul className="light-list">
              <li >Create a new label</li>
              <hr />
              <li className="toggleColorblind">
                Enable color blind friendly mode.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabelsPopover;
