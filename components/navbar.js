import React from "react";
import { FaPlay } from "react-icons/fa";

const Navbar = ({ letRun }) => {
  return (
    <nav className="w-screen h-[5vh] sm:h-[10vh]  rounded-lg relative flex justify-between items-center">
      <div className="text-3xl font-bold font-serif m-2 p-2 flex items-center sm:gap-2">
        <h1>CodeExcu</h1>
        <h1 className="sm:block hidden"> | Here you can run</h1>
        <h1 className="text-yellow-400 sm:block hidden">JavaScript</h1>
      </div>
      <h1>
        <button
          onClick={() => letRun(true)}
          className="bg-yellow-500  px-2 text-xl rounded-md mx-4 mt-1"
          name="run"
          title="click to run the code"
        >
          {/* <FaPlay /> */}
          run
        </button>
      </h1>
    </nav>
  );
};

export default Navbar;
