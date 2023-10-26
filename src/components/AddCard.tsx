"use client";

import React, { useState } from "react";

export default function AddCard({
  addCard,
}: {
  addCard: (title: string) => void;
}) {
  const [title, setTitle] = useState<string>("");

  return (
    <div className="flex gap-4 w-2/3 p-5 items-center bg-black/20 justify-center rounded-md mx-auto mb-10">
      <h3 className="flex justify-center font-bold text-2xl">
        Card Title
      </h3>
      <input
        type="text"
        className="flex text-black outline-none border rounded-sm p-2"
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add Items..."
        value={title}
      />
      <button
      className="flex mx-3 bg-green-500 text-white p-2 rounded-sm"
        onClick={() => {
          addCard(title);
          setTitle("");
        }}
      >
        Add Card
      </button>
    </div>
  );
}