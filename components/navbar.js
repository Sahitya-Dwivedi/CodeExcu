import React from "react";
import { FaPlay } from "react-icons/fa";

const Navbar = ({ letRun }) => {
  return (
    <nav className="w-screen h-[10vh]  rounded-lg relative">
      <h1 className="text-3xl font-bold font-serif m-2 p-2">CodeExcu</h1>
      <button
        onClick={() => letRun(true)}
        className="bg-yellow-500 absolute right-0 bottom-0 my-2 mx-4 px-2 text-lg rounded-md"
      >
        {/* <FaPlay /> */}
        run
      </button>
    </nav>
  );
};

export default Navbar;
