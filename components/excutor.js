import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";

const Excutor = ({ toRun, ChangeRun }) => {
  const [value, setValue] = useState([]);
  const [showOption, setShowOption] = useState(false);

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
    <div className="overflow-hidden  bg-gray-800 rounded-xl mx-2 mb-1">
      <div className="terminal h-[90vh] w-[48vw] overflow-y-auto">
        <div className="flex absolute right-0">
          <button
            onClick={() => setValue([])}
            className="clear_terminal text-blue-400 text-xl border-2 border-blue-400 rounded-md p-1 m-2  hover:text-black hover:bg-blue-400 transition-all duration-500 ease-in-out h-fit"
          >
            <FaTrash />
          </button>
          {/* will add later */}
          {/* <div>
          <button
            onClick={() => setShowOption(!showOption)}
            className="clear_terminal text-blue-400 text-xl border-2 border-blue-400 rounded-md p-1 m-2  hover:text-black hover:bg-blue-400 transition-all duration-500 ease-in-out"
          >
            <LuLayoutPanelLeft />
          </button>
          {showOption && (
            <div className="rounded-md p-2 m-2">
              <button className="text-blue-400 text-xl border-2 border-blue-400 rounded-md p-1 hover:text-black hover:bg-blue-400 transition-all duration-500 ease-in-out">
                <BsLayoutSidebarInsetReverse />
              </button>
              <button></button>
              <button></button>
            </div>
          )}
        </div> */}
        </div>
        <div className="terminalData mx-4">
          {value.map((val) => (
            <div
              key={uuidv4()}
              className="whitespace-pre py-1 my-1 tracking-widest text-wrap"
            >
              {val}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Excutor;
