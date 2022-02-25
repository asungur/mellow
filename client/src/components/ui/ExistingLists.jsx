import React, { useState } from "react";
import { useSelector } from "react-redux";
import List from "./List";

const ExistingLists = ({ boardId }) => {
  const [ activeList, setActiveList ] = useState(null);

  const lists = useSelector((state) => {
    return state.lists.filter((list) => list.boardId === boardId)
  })

  return (
    <>
      {lists.map(list =>
        <List
          key={list._id}
          list={list}
          setActiveList={setActiveList}
          activeList={activeList}
        />
      )}
    </>
  )
};


export default ExistingLists;
