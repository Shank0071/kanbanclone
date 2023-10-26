"use client";

import KanbanCard from "@/components/KanbanCard";


interface KanbanLaneProps {
  title: string;
  items: Cards[];
  dragging: boolean;
}

export default function KanbanLane({ title, items }: KanbanLaneProps) {
    


  return (
    <div className={`flex flex-col p-2 rounded-md shadow-lg min-h-[160px] h-full`}>
      <h3 className="font-bold">{title}</h3>
      <div className="flex min-h-full p-2 flex-col">
        {items.map(({ title: cardTitle }, key) => (
            <KanbanCard key={key} title={cardTitle} index={key} parent={title} isOver={false} />
        ))}
      </div>
    </div>
  );
}