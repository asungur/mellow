import React from "react";

const LabelsPopover = ({ labels }) => {
  const handleCreateLabel = () => {
    console.log('created the label :)')
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
              {labels.map(label =>
                <li key={label._id}>
                  <div className={`${label.color} colorblindable`} data-id="1">
                    {label.name}
                    <i className="check-icon sm-icon"></i>
                  </div>
                  <div className={`label-background ${label.color}`}></div>
                  <div className="label-background-overlay"></div>
                  <i className="edit-icon icon not-implemented"></i>
                </li>
              )}
            </ul>
            <ul className="light-list">
              <li onClick={handleCreateLabel} className="not-implemented">Create a new label</li>
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
