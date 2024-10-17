import React, { useEffect, useState } from "react";

const Excutor = ({ code }) => {
  const [value, setValue] = useState([]);

  const handleEval = () => {
    let outputLog = [];

    // saving original console
    const OriginalConsoleLog = console.log;
    const OriginalConsoleError = console.error;
    const OriginalConsoleWarn = console.warn;
    const OriginalConsoleInfo = console.info;
    const OriginalConsoleDebug = console.debug;

    // // during designing need to design these also
    // overwriting console
    console.log = (...args) => {
      outputLog.push(args);
    };

    console.error = (...args) => {
      outputLog.push(`Error: ${args}`);
    };

    console.warn = (...args) => {
      outputLog.push(`Warning: ${args}`);
    };

    console.info = (...args) => {
      outputLog.push(`Info: ${args}`);
    };

    console.debug = (...args) => {
      outputLog.push(`Debug: ${args}`);
    };

    // evaluating code
    try {
      code ? eval(code) : eval(localStorage.getItem("code"));
    } catch (error) {
      outputLog.push(`Error: ${error.message}`);
    }

    // restoring console
    console.log = OriginalConsoleLog;
    console.error = OriginalConsoleError;
    console.warn = OriginalConsoleWarn;
    console.info = OriginalConsoleInfo;
    console.debug = OriginalConsoleDebug;

    // setting value to output log
    setValue(outputLog);
  };
  return (
    <div className="bg-red-900 h-screen w-[50vw]">
      <button onClick={handleEval} className="bg-yellow-800">
        run
      </button>
      {value.map((val) => {
        return <div key={Math.random()}>{val}</div>;
      })}
    </div>
  );
};

export default Excutor;
