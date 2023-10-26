"use client";

import { useBoardStore } from "@/store/BoardStore";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";

const KanbanCard = ({
  title,
  index,
  parent,
  isOver,
}: {
  title: string;
  index: number;
  parent: string;
  isOver: boolean;
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: title,
    data: {
      title,
      index,
      parent,
    },
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const {
    id,
    updateTaskById,
    uItems,
    doneItems,
    todoItems,
    inProgressItems,
    setDoneItems,
    setUItems,
    setInProgressItems,
    setTodoItems,
  } = useBoardStore();
  // console.log("id", id)



  const handleClick = () => {
    let result = [];
    if (parent === "Unassigned") {
      result = uItems.filter((t) => t.title !== title);
      setUItems(result);
      updateTaskById(id, { uItems: [...result] });

    } else if (parent === "Done") {
      result = doneItems.filter((t) => t.title !== title);
      setDoneItems(result);
      updateTaskById(id, { doneItems: [...result] });
    } else if (parent === "ToDo") {
      result = todoItems.filter((t) => t.title !== title);
      setTodoItems(result);
      updateTaskById(id, { todoItems: [...result] });
    } else {
      result = inProgressItems.filter((t) => t.title !== title);
      setInProgressItems(result);
      updateTaskById(id, { inprogressItems: [...result] });
    }
  };

  return (
    <div
      className="flex justify-between p-2 m-2 rounded-md border border-gray-500 shadow-md"
      style={style}
      {...listeners}
      {...attributes}
      ref={setNodeRef}
    >
      <h2>{title}</h2>
      <button
        className="bg-red-400 hover:scale-110 rounded-md hover:bg-red-500"
        onClick={handleClick}
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default KanbanCard;
