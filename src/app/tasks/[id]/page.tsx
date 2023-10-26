"use client";

import React from "react";
import KanbanBoard from "@/components/KanbanBoard";
import { useBoardStore } from "@/store/BoardStore";
import { useLoadingStore } from "@/store/LoadingStore";
import { FallingLines } from "react-loader-spinner";
import { useEffect } from "react";

function Items({ params }: { params: { id: string } }) {
  const id = params.id;

  const { setId, setUItems, setDoneItems, setInProgressItems, setTodoItems } =
    useBoardStore();
  const { loading, setLoading } = useLoadingStore();


  useEffect(() => {
    const getBoard = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/tasks/${id}`);
        const data = await res.json();
        setId(id)
        setUItems(data.uItems);
        setDoneItems(data.doneItems);
        setInProgressItems(data.inprogressItems);
        setTodoItems(data.todoItems);    
        setLoading(false);
      } catch (err) {
        console.log(`Error occurred while fetching data ${err}`);
        setLoading(false);
      }
    };
    getBoard();
  }, [id]);


  return (
    <>
      {loading && (
        <div className="flex justify-center min-h-screen items-center">
          <FallingLines color="#4fa94d" width="100" visible={true} />
        </div>
      )}
      {!loading && <KanbanBoard {...params} />}
    </>
  );
}

export default Items;
