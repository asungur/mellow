import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from 'react-router-dom';
import { getCard } from "../../actions/CardActions";
import CardHeader from "./CardHeader";
import LabelsPopover from "./LabelsPopover";
import CardDescription from "./CardDescription"
import CardComment from "./CardComment"

const Card = () => {
  let dueDate;
  let datePassed = false;
  const id = useParams().cardId;
  const dispatch = useDispatch();
  const history = useHistory();
  const [showPopover, setShowPopover] = useState(false);

  const togglePopover = () => {
    setShowPopover(!showPopover)
  }

  const card = useSelector(state => {
    return state.cards.find(card => card._id === id);
  })

  useEffect(() => {
    dispatch(getCard(id))
  }, [dispatch, id]);

  if (card) {
    // Date to be updated
    dueDate = new Date(card.createdAt);
    datePassed = Date.now() > dueDate;
  }

  const exitModal = () => {
    history.push(`/boards/${card.boardId}`)
  }

  const handleEscKey = e => {
    if (e.key === 'Escape') {
      exitModal()
    }
  }

  const handleShowAddLabelPopoever = (e) => {
    e.stopPropagation();
    togglePopover();
  }

  if (card) {
    return (
      <div id="modal-container" tabIndex={-1} onKeyUp={handleEscKey}>
        <div className="screen" onClick={exitModal}></div>
        <div id="modal" onClick={() => setShowPopover(false)}>
          <Link to={`/boards/${card.boardId}`}>
            <i className="x-icon icon close-modal"></i>
          </Link>
          <CardHeader card={card} />
          <section className="modal-main">
            <ul className="modal-outer-list">
              <li className="details-section">
                <ul className="modal-details-list">
                  <li className="labels-section">
                    <h3>Labels</h3>
                    {card.labels.map(label =>
                      <div key={label._id} className="member-container">
                        <div className={`${label.color} label colorblindable`}>{label.name}</div>
                      </div>
                    )}
                    <div className="member-container">
                      <i className="plus-icon sm-icon" onClick={handleShowAddLabelPopoever}></i>
                    </div>
                    {showPopover ? <LabelsPopover labels={card.labels}/> : null }
                  </li>
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
                </ul>
                <CardDescription card={card}/>
              </li>
              <CardComment card={card} />
            </ul>
          </section>
          {/* <aside className="modal-buttons">
            <h2>Add</h2>
            <ul>
              <li className="member-button">
                <i className="person-icon sm-icon"></i>Members
              </li>
              <li className="label-button">
                <i className="label-icon sm-icon"></i>Labels
              </li>
              <li className="checklist-button">
                <i className="checklist-icon sm-icon"></i>Checklist
              </li>
              <li className="date-button not-implemented">
                <i className="clock-icon sm-icon"></i>Due Date
              </li>
              <li className="attachment-button not-implemented">
                <i className="attachment-icon sm-icon"></i>Attachment
              </li>
            </ul>
            <h2>Actions</h2>
            <ul>
              <li className="move-button">
                <i className="forward-icon sm-icon"></i>Move
              </li>
              <li className="copy-button">
                <i className="card-icon sm-icon"></i>Copy
              </li>
              <li className="subscribe-button">
                <i className="sub-icon sm-icon"></i>Subscribe
                <i className="check-icon sm-icon"></i>
              </li>
              <hr />
              <li className="archive-button">
                <i className="file-icon sm-icon "></i>Archive
              </li>
            </ul>
            <ul className="light-list">
              <li className="not-implemented">Share and more...</li>
            </ul>
          </aside> */}
        </div>
      </div>
    );
  }
  return null;
};

export default Card;
