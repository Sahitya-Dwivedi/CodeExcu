import React from "react";

const Navbar = ({ letRun }) => {
  return (
    <nav className="w-screen h-[10vh] bg-blue-800">
      <button onClick={() => letRun(true)}>run</button>
    </nav>
  );
};

export default Navbar;