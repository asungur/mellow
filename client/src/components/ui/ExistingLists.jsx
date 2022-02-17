import React from "react";
import { useSelector } from "react-redux";
import List from "./List";

const ExistingLists = ({ id }) => {
  const lists = useSelector((state) => {
    return state.lists.filter((list) => list.boardId === id)
  })

  return (
    <>
    {lists.map(list => 
      <List
        key={list._id}
        id={list._id}
        title={list.title}
      />
    )}
    </>
  )
};


export default ExistingLists;