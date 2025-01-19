import React from "react";
import { FaPlay } from "react-icons/fa";

const Navbar = ({ letRun }) => {
  return (
    <nav className="w-screen h-[10vh]  rounded-lg relative flex justify-between items-center">
      <div className="text-3xl font-bold font-serif m-2 p-2 flex items-center gap-2">
        <h1>CodeExcu | Here you can run</h1>
        <h1 className="text-yellow-400">JavaScript</h1>
      </div>
      <h1>
      <button
        onClick={() => letRun(true)}
        className="bg-yellow-500  px-2 text-xl rounded-md mx-4 mt-1"
      >
        {/* <FaPlay /> */}
        run
      </button>
      </h1>
    </nav>
  );
};

export default Navbar;
