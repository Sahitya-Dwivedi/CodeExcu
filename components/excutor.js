import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";

const Excutor = ({ code, toRun, ChangeRun }) => {
  const [value, setValue] = useState([]);

  const handleEval = useCallback(() => {
    let outputLog = [];
    let worker = new Worker(new URL("../public/Worker.js", import.meta.url));
    let code = localStorage.getItem("code");
    worker.postMessage(code);
    worker.onmessage = (e) => {
      e.data.map((val, i) => {
        if (typeof val === "object") {
          const table = (
            <table key={uuidv4()}>
              <thead>
                <tr>
                  <th>(Index)</th>
                  {val.headers.map((val) => {
                    return <th key={uuidv4()}>{val}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {val.rows.map((val) => {
                  return (
                    <tr key={uuidv4()}>
                      {Array.isArray(val) &&
                        val.map((subval) => {
                          return <td key={uuidv4()}>{subval}</td>;
                        })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
          outputLog.push(table);
        } else {
          outputLog.push(val);
        }
      });
      setValue(outputLog);
    };
  }, []);

  useEffect(() => {
    if (toRun) {
      handleEval();
      ChangeRun(false);
    }
  }, [ChangeRun, handleEval, toRun]);
  return (
    <div className="h-[90vh] w-[50vw] overflow-auto scroll-smooth">
      <button
        onClick={() => console.log("You Clicked This Button")}
        className="clear_terminal text-blue-400 text-xl border-2 border-blue-400 rounded-md p-1 m-2 right-0 absolute"
      >
        <FaTrash />
      </button>
      {value.map((val) => (
        <div
          key={uuidv4()}
          className="whitespace-pre py-1 my-1 tracking-widest"
        >
          {val}
        </div>
      ))}
    </div>
  );
};

export default Excutor;
