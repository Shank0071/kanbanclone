"use client";

import { DndContext, DragEndEvent, UniqueIdentifier, rectIntersection, MouseSensor, useSensor, KeyboardSensor, useSensors } from "@dnd-kit/core";
import KanbanLane from "./KanbanLane";
import AddCard from "./AddCard";
import { useState, useEffect } from "react";
import getUpdatedItemsArray from "@/lib/getUpdatedItemsArray";
import { Droppable } from "./Droppable/Droppable";
import { useBoardStore } from "@/store/BoardStore";
import { FC } from "react";
import { useSession } from "next-auth/react";



const categoryAddedItems = (arr: any[], cat: string) => {
  const newArr = arr.map((i: any) => {
    return {...i, category: cat}
  })
  return newArr
}

export default function KanbanBoard({id}: {id: any}) {

  const session = useSession()

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10
    }
  })

  const keyboardSensor = useSensor(KeyboardSensor)
  const sensors = useSensors(mouseSensor, keyboardSensor)

  const [isDragging, setIsDragging] = useState(false); 
  const [ren, setRen] = useState(false)
  const {setId, updateTaskById} = useBoardStore();





  const [
    uItems,
    setUItems,
    doneItems,
    setDoneItems,
    inProgressItems,
    setInProgressItems,
    todoItems,
    setTodoItems,
   ] = useBoardStore((state) => [
    state.uItems,
    state.setUItems,
    state.doneItems,
    state.setDoneItems,
    state.inProgressItems,
    state.setInProgressItems,
    state.todoItems,
    state.setTodoItems
   ]);

  console.log(id)
  console.log(uItems, doneItems)

  // useEffect(() => {
  //   updateTaskById(id, {uItems: categoryAddedItems(uItems, "UNASSIGNED")})
  //   updateTaskById(id, {inprogressItems: categoryAddedItems(inProgressItems, "IN_PROGRESS")})
  //   updateTaskById(id, {doneItems: categoryAddedItems(doneItems, "DONE")})
  //   updateTaskById(id, {todoItems: categoryAddedItems(todoItems, "TODO")})
  // }, [todoItems, doneItems, inProgressItems, uItems, id])


  const addNewCard = (title: string) => {
    // setUItems([{title: "hello"}])
    if (title.length !== 0) {
      setUItems([...uItems, { title: title }]);
      updateTaskById(id, {uItems: [...uItems, {title: title, category: "UNASSIGNED"}] })
    }
  };

  const handleOnDragEnd = (e: DragEndEvent) => {
    // setParent(e.over?.id)
    const container = e.over?.id;
    const title = e.active.data.current?.title ?? "";
    const index = e.active.data.current?.index ?? 0;
    const parent = e.active.data.current?.parent ?? "ToDo";

    if (!container) {
      const t = e.active.data.current?.title ?? "";
      if (e.active.data.current?.parent === "ToDo") {
        const updatedTodos = getUpdatedItemsArray(todoItems, t);
        setTodoItems(updatedTodos);
      } else if (e.active.data.current?.parent === "Done") {
        const updatedDoneItems = getUpdatedItemsArray(doneItems, t);
        setDoneItems(updatedDoneItems);
      } else if (e.active.data.current?.parent === "Unassigned") {
        const updatedUItems = getUpdatedItemsArray(uItems, t);
        setUItems(updatedUItems);
        console.log(updatedUItems)
      } else {
        const updatedInProgress = getUpdatedItemsArray(inProgressItems, t);
        setInProgressItems(updatedInProgress);
      }
  
      return;
    }

    if (e.active.data.current?.parent === e.over?.id) {
      const t = e.active.data.current?.title ?? "";
      if (e.active.data.current?.parent === "ToDo") {
        const updatedTodos = getUpdatedItemsArray(todoItems, t);
        setTodoItems(updatedTodos);
      } else if (e.active.data.current?.parent === "Done") {
        const updatedDoneItems = getUpdatedItemsArray(doneItems, t);
        setDoneItems(updatedDoneItems);
      } else if (e.active.data.current?.parent === "Unassigned") {
        const updatedUItems = getUpdatedItemsArray(uItems, t);
        setUItems(updatedUItems);
      } else {
        const updatedInProgress = getUpdatedItemsArray(inProgressItems, t);
        setInProgressItems(updatedInProgress);
      }
      return;
    }
    if (container === "ToDo") {
      setTodoItems([...todoItems, { title }]);
    } else if (container === "Done") {
      setDoneItems([...doneItems, { title }]);
    } else if (container === "Unassigned") {
      setUItems([...uItems, { title }]);
    } else {
      setInProgressItems([...inProgressItems, { title }]);
    }
    if (parent === "ToDo") {    
      setTodoItems([
        ...todoItems.splice(0, index),
        ...todoItems.splice(index + 1),
      ]);
    } else if (parent === "Done") {
      setDoneItems([
        ...doneItems.splice(0, index),
        ...doneItems.splice(index + 1),
      ]);
    } else if (parent === "Unassigned") {
      setUItems([...uItems.splice(0, index), ...uItems.slice(index + 1)]);
    } else {
      setInProgressItems([
        ...inProgressItems.splice(0, index),
        ...inProgressItems.splice(index + 1),
      ]);
    }
    setIsDragging(false);
   
  };



  // console.log("dragging", isDragging);


  return (
    <DndContext
      collisionDetection={rectIntersection}
      sensors={sensors}
      onDragStart={() => setIsDragging(true)}
      onDragCancel={() => setIsDragging(false)}
      onDragEnd={(e) => {
        handleOnDragEnd(e);
        setIsDragging(false);
        setRen(prev => !prev)  
      }}
    >
      <div className="flex justify-center">
        <div className="w-full p-5">
          <AddCard addCard={addNewCard} />
          <div className="flex gap-4 md:grid md:grid-cols-4">
            <Droppable key="1" dragging={isDragging} id="ToDo">
              <KanbanLane
                key="ToDo"
                title="ToDo"
                items={todoItems}
                dragging={isDragging}
              />
            </Droppable>
            <Droppable key="2" dragging={isDragging} id="In Progress">
              <KanbanLane
                key="InProgress"
                title="In Progress"
                items={inProgressItems}
                dragging={isDragging}
              />
            </Droppable>
            <Droppable key="3" dragging={isDragging} id="Done">
              <KanbanLane
                key="Done"
                title="Done"
                items={doneItems}
                dragging={isDragging}
              />
            </Droppable>
            <Droppable key="4" dragging={isDragging} id="Unassigned">
              <KanbanLane
                key="Unassigned"
                title="Unassigned"
                items={uItems}
                dragging={isDragging}
              />
            </Droppable>
          </div>
        </div>
      </div>
    </DndContext>
  );
}
