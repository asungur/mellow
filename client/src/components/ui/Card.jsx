import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useHistory } from 'react-router-dom';
import { getCard } from "../../actions/CardActions";
import CardHeader from "./CardHeader";
import LabelsPopover from "./LabelsPopover";

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
                    {showPopover ? <LabelsPopover /> : null }
                  </li>
                  <li className="due-date-section">
                    <h3>Due Date</h3>
                    <div id="dueDateDisplay" className="overdue completed">
                      <input
                        id="dueDateCheckbox"
                        type="checkbox"
                        className="checkbox"
                        checked=""
                      />
                      {dueDate && dueDate.toDateString()} <span>{datePassed && '(past due)'}</span>
                    </div>
                  </li>
                </ul>
                <form className="description">
                  <p>Description</p>
                  <span id="description-edit" className="link">
                    Edit
                  </span>
                  <p className="textarea-overlay">
                    Cards have a symbol to indicate if they contain a description.
                  </p>
                  <p id="description-edit-options" className="hidden">
                    You have unsaved edits on this field.{" "}
                    <span className="link">View edits</span> -{" "}
                    <span className="link">Discard</span>
                  </p>
                </form>
              </li>
              {/* <li className="comment-section">
                <h2 className="comment-icon icon">Add Comment</h2>
                <div>
                  <div className="member-container">
                    <div className="card-member">TP</div>
                  </div>
                  <div className="comment">
                    <label>
                      <textarea
                        required=""
                        rows="1"
                        placeholder="Write a comment..."
                      ></textarea>
                      <div>
                        <a className="light-button card-icon sm-icon"></a>
                        <a className="light-button smiley-icon sm-icon"></a>
                        <a className="light-button email-icon sm-icon"></a>
                        <a className="light-button attachment-icon sm-icon"></a>
                      </div>
                      <div>
                        <input
                          type="submit"
                          className="button not-implemented"
                          value="Save"
                        />
                      </div>
                    </label>
                  </div>
                </div>
              </li>
              <li className="activity-section">
                <h2 className="activity-icon icon">Activity</h2>
                <ul className="horiz-list">
                  <li className="not-implemented">Show Details</li>
                </ul>
                <ul className="modal-activity-list">
                  <li>
                    <div className="member-container">
                      <div className="card-member">TP</div>
                    </div>
                    <h3>Taylor Peat</h3>
                    <div className="comment static-comment">
                      <span>The activities are not functional.</span>
                    </div>
                    <small>
                      22 minutes ago - <span className="link">Edit</span> -{" "}
                      <span className="link">Delete</span>
                    </small>
                    <div className="comment">
                      <label>
                        <textarea value="activies" required="" rows="1">
                          The activities have not been implemented yet.
                        </textarea>
                        <div>
                          <a className="light-button card-icon sm-icon"></a>
                          <a className="light-button smiley-icon sm-icon"></a>
                          <a className="light-button email-icon sm-icon"></a>
                        </div>
                        <div>
                          <p>You haven&apos;t typed anything!</p>
                          <input
                            type="submit"
                            className="button not-implemented"
                            value="Save"
                          />
                          <i className="x-icon icon"></i>
                        </div>
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="member-container">
                      <div className="card-member small-size">VR</div>
                    </div>
                    <p>
                      <span className="member-name">Victor Reyes</span> changed the
                      background of this board <small>yesterday at 4:53 PM</small>
                    </p>
                  </li>
                  <li className="activity-comment">
                    <div className="member-container">
                      <div className="card-member">VR</div>
                    </div>
                    <h3>Victor Reyes</h3>
                    <div className="comment static-comment">
                      <span>Example of a comment.</span>
                    </div>
                    <small>
                      22 minutes ago - <span className="link">Edit</span> -{" "}
                      <span className="link">Delete</span>
                    </small>
                    <div className="comment">
                      <label>
                        <textarea required="" rows="1">
                          Example of a comment.
                        </textarea>
                        <div>
                          <a className="light-button card-icon sm-icon"></a>
                          <a className="light-button smiley-icon sm-icon"></a>
                          <a className="light-button email-icon sm-icon"></a>
                        </div>
                        <div>
                          <p>You haven&apos;t typed anything!</p>
                          <input
                            type="submit"
                            className="button not-implemented"
                            value="Save"
                          />
                          <i className="x-icon icon"></i>
                        </div>
                      </label>
                    </div>
                  </li>
                </ul>
              </li> */}
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
