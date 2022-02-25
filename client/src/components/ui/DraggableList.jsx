import React from 'react';
import { useDrag, useDrop } from "react-dnd";
import List from './List';

const DraggableList = ({ list, setActiveList, activeList }) => {
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "list",
    drop: () => moveList(),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  let activeListClass;
  let draggingClass;

  if (activeList === list._id) {
    activeListClass = 'add-dropdown-active'
  }
  if (isOver) {
    draggingClass = 'dragging'
  }
  
  return (
    <div className={`list-wrapper ${activeListClass} ${draggingClass}`}>
      <List
        ref={dropRef}
        list={list}
        setActiveList={setActiveList}
        activeList={activeList}
      />
    </div>
  )
}


export default DraggableList;
