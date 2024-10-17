import React, { useEffect, useState } from "react";

const Excutor = ({ code }) => {
  const [value, setValue] = useState("");

  const handleEval = () => {
    let outputLog = "";

    const OriginalLog = console.log;
    console.log = (...args) => {
      outputLog += args;
    };

    try {
      code ? eval(code) : eval(localStorage.getItem("code"));
    } catch (error) {
      outputLog = `Error: ${error.message}`;
    }
    console.log = OriginalLog;
    setValue(outputLog);
    console.log(outputLog);
  };
  return (
    <div className="bg-red-900 h-screen w-[50vw]">
      <button onClick={handleEval} className="bg-yellow-800">
        run
      </button>
      <div>{value}</div>
    </div>
  );
};

export default Excutor;
