import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getBoard } from "../../actions/BoardActions";
import { createList } from "../../actions/ListActions";
import ExistingLists from "./ExistingLists";
import findBoardId from "../../lib/findBoardId";

const Board = () => {
  const id = useParams().id;
  const dispatch = useDispatch();
  const [ newListTitle, setNewListTitle ] = useState('');
  const [ addAListDisplayed, setAddAListDisplayed ] = useState(false);

  const state = useSelector((state) => state);
  const boardId = findBoardId(id, state);
  const board = useSelector((state) => state.boards).find(b => b._id === boardId);

  useEffect(() => {
    if (!boardId) { return }
    dispatch(getBoard(boardId));
  }, [dispatch, boardId]);

  const handleAddAListInput = e => {
    e.preventDefault();
    setNewListTitle(e.target.value);
  }

  const toggleAddAList = () => {
    setAddAListDisplayed(!addAListDisplayed);
  }

  const handleDisplayAddAList= e => {
    e.preventDefault();
    toggleAddAList();
  }

  const handleSaveNewList = e => {
    e.preventDefault();
    if (!newListTitle) {
      return;
    }
    dispatch(createList(newListTitle, id));
    setNewListTitle('');
    toggleAddAList();
  }

  if (board) {
    return (
      <>
        <header>
          <ul>
            <li id="title">{board.title}</li>
            <li className="star-icon icon"></li>
            <li className="private private-icon icon">Private</li>
          </ul>
          <div className="menu">
            <i className="more-icon sm-icon"></i>Show Menu
          </div>
          <div className="subscribed">
            <i className="sub-icon sm-icon"></i>Subscribed
          </div>
        </header>
        <main>
          <div id="list-container" className="list-container">
            <div id="existing-lists" className="existing-lists">
              <ExistingLists boardId={board._id}/>
            </div>
            <div id="new-list" className={addAListDisplayed ? "new-list selected" : "new-list"}>
              <span onClick={handleDisplayAddAList}>Add a list...</span>
              <input type="text" placeholder="Add a list..." value={newListTitle} onChange={handleAddAListInput} />
              <div>
                <input onClick={handleSaveNewList} type="submit" className="button" value="Save" />
                <i onClick={handleDisplayAddAList} className="x-icon icon"></i>
              </div>
            </div>
          </div>
        </main>
        <div className="menu-sidebar">
          <div id="menu-main" className="main slide">
            <i className="back-icon icon"></i>
            <i className="x-icon icon"></i>
            <h1>Menu</h1>
            <div className="menu-contents">
              <div className="members">
                <div className="member-container">
                  <div className="card-member ">VR</div>
                </div>
                <div className="member-container">
                  <div className="card-member admin">TP</div>
                </div>
                <div className="member-container">
                  <div className="card-member ">KW</div>
                </div>
              </div>
              <div className="add-members">
                <i className="add-icon sm-icon"></i>Add Members...
              </div>
              <hr />
              <ul className="menu-list">
                <li className="background-item">Change Background</li>
                <li className="filter-icon menu-icon">Filter Cards</li>
                <li className="power-icon menu-icon not-implemented">Power-Ups</li>
                <li className="stickers-icon menu-icon not-implemented">Stickers</li>
                <li className="more-icon menu-icon">More</li>
                <hr />
                <li className="activity-icon menu-icon not-implemented">Activity</li>
              </ul>
              <ul className="activity-list">
                <li>
                  <i className="member-icon"></i>
                  <p>
                    <span className="member-name">Taylor Peat</span> changed the
                    background of this board <small>yesterday at 4:53 PM</small>
                  </p>
                </li>
                <li>
                  <i className="member-icon"></i>
                  <p>
                    <span className="member-name">Taylor Peat</span> sent{" "}
                    <span className="link">
                      Use the + in the top menu to make your first board now.
                    </span>{" "}
                    to the board <small>4 hours ago</small>
                  </p>
                </li>
                <li>
                  <i className="member-icon"></i>
                  <p>
                    <span className="member-name">Taylor Peat</span> archived{" "}
                    <span className="link">
                      Use the + in the top menu to make your first board now.
                    </span>{" "}
                    <small>4 hours ago</small>
                  </p>
                </li>
                <li>
                  <i className="member-icon"></i>
                  <p>
                    <span className="member-name">Taylor Peat</span> changed the
                    background of this board <small>5 hours ago</small>
                  </p>
                </li>
                <li>
                  <i className="member-icon"></i>
                  <p>
                    <span className="member-name">Taylor Peat</span> changed the
                    background of this board <small>6 hours ago</small>
                  </p>
                </li>
                <li>
                  <i className="member-icon"></i>
                  <p>
                    <span className="member-name">Taylor Peat</span> changed the
                    background of this board <small>yesterday at 10:23 PM</small>
                  </p>
                </li>
              </ul>
              <a className="all-activity not-implemented">View all activity...</a>
            </div>
          </div>
        </div>
        <div id="modal-container"></div>
        <div id="dropdown-container"></div>
      </>
    );
  }

  return null;
};

export default Board
