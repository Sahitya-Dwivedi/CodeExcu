import React from "react";

const Navbar = ({ letRun }) => {
  return (
    <header className="w-screen h-[52px] bg-blue-900 ">
      <button onClick={() => letRun(true)}>run</button>
    </header>
  );
};

export default Navbar;
