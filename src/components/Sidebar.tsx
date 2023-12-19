"use client";

import Link from "next/link";
import { FallingLines } from "react-loader-spinner";
import { useState, useEffect, FormEvent } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Modal from "./Modal";
import { LogoutButton } from "@/app/auth";


function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const session = useSession();
  const [title, setTitle] = useState(null || "");

  console.log("sidebar:", session);

  const [items, setItems] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const getLinks = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/tasks");
        const data = await res.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        console.log(`An error occurred ${err}`);
        setLoading(false);
      }
    };
    getLinks();
  }, [showModal]);

  console.log(title);

  const handleClick = () => {
    setShowModal((prev) => !prev);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch("/api/tasks", {
      method: "POST",
      body: JSON.stringify({
        uItems: [],
        doneItems: [],
        name: title,
        inprogressItems: [],
        todoItems: [],
      }),
    });

    if (res.ok) {
      setShowModal(false);
    }

    if (!res.ok) {
      alert("an error occurred");
    }
  };

  return (
    <div className="w-64 bg-slate-950">
      <div className="flex items-center justify-around p-4">
        <h1 className="text-center font-bold text-4xl text-white">
          Master
        </h1>
        {session?.data?.user && <LogoutButton />}
      </div>

      {loading && (
        <div className="flex justify-center">
          <FallingLines color="#4fa94d" width="100" visible={true} />
        </div>
      )}
      {!loading && (
        <>
          <ul className="flex flex-col gap-2 mt-4 justify-center ">
            {items.map((i) => (
              <li
                key={i.id}
                className={`text-white p-2 font-bold w-full text-right ${
                  pathname === `/tasks/${i.id}` ? "bg-slate-700" : ""
                }`}
              >
                <Link href={`/tasks/${i.id}`}>{i.name}</Link>
              </li>
            ))}
          </ul>
          {session?.data?.user && (
            <p
              onClick={handleClick}
              className="text-white flex justify-end w-fit font-bold bg-green-500 ml-auto m-2 rounded-md hover:bg-green-700 cursor-pointer py-1 px-2"
            >
              +
            </p>
          )}
        </>
      )}

      {showModal && (
        <Modal>
          <div className="relative bg-slate-600 p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
              <h3 className="font-bold">Add Category:</h3>
              <input
                className="p-2 rounded-md text-black"
                type="text"
                placeholder="Add Category"
                onChange={(e) => setTitle(e.target.value)}
              />
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded-md"
              >
                Add
              </button>
            </form>
            <p
              onClick={handleClick}
              className="absolute hover:cursor-pointer top-0 right-0 font-bold"
            >
              x
            </p>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default Sidebar;
