import React from 'react';
import {useDroppable, UniqueIdentifier} from '@dnd-kit/core';


interface Props {
  children: React.ReactNode;
  dragging: boolean;
  id: UniqueIdentifier;
}

export function Droppable({children, id, dragging}: Props) {
  const {isOver, setNodeRef} = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`${isOver ? "bg-slate-900" : "bg-slate-900"} rounded-md`}
      aria-label="Droppable region"
    >
      {children}
    </div>
  );
}