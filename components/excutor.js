import React, { useState, useEffect, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaTrash } from "react-icons/fa";
import { LuLayoutPanelLeft } from "react-icons/lu";
import { BsLayoutSidebarInsetReverse } from "react-icons/bs";

const Excutor = ({ toRun, ChangeRun, toStop, ChangeStop }) => {
  const [value, setValue] = useState([]);
  const [outputLog, setOutputLog] = useState([]);
  const [timeoutDelay, setTimeoutDelay] = useState(0);
  const [showOption, setShowOption] = useState(false);
  const worker = useRef(null);

  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "ḍ") {
        setValue([]);
      }
    });
  }, []);

  const handleEval = useCallback((stop) => {
    if (stop) {
      alert("Execution Stopped");
      worker.current?.terminate();
      worker.current = null;
      alert("Execution Stopped");
      console.log("Execution Stopped");
      return;
    }
    let outputLog = [];
    worker.current = new Worker(
      new URL("../public/Worker.js", import.meta.url),
    );
    let code = localStorage.getItem("code");
    worker.current.postMessage(code);
    worker.current.onmessage = (e) => {
      // console.log(e.data);
      e.data.outputLog.map((val, i) => {
        console.log(val);
        if (typeof val === "object") {
          const headersHtml = Array.isArray(val.headers)
            ? val.headers.map((header) => `<th>${header}</th>`).join("")
            : "";

          const rowsHtml = Array.isArray(val.rows)
            ? val.rows
                .map((row) => {
                  if (!Array.isArray(row)) return "";
                  const cells = row.map((cell) => `<td>${cell}</td>`).join("");
                  return `<tr>${cells}</tr>`;
                })
                .join("")
            : "";

          const table = `
            <table>
              <thead>
                <tr>
                  <th>(Index)</th>
                  ${headersHtml}
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          `;

          outputLog.push(table);
          console.log(table);
          document.querySelector(".content").innerHTML += table;
        } else {
          outputLog.push(val);
          document.querySelector(".content").innerHTML +=
            "<div>" + val + "</div>";
        }
      });
      // setTimeoutDelay(e.data.timeoutDelay);
      setOutputLog(outputLog);
      // document.querySelector(".content").innerHTML = "<div>" + outputLog.join("</div><div>") + "</div>";
    };
  }, []);

  useEffect(() => {
    if (toRun) {
      handleEval(false);
      ChangeRun(false);
    }
  }, [ChangeRun, handleEval, toRun]);

  useEffect(() => {
    setValue([...outputLog]);
  }, [outputLog]);

  useEffect(() => {
    if (toStop) {
      handleEval(true);
      ChangeStop(false);
    }
  }, [toStop, handleEval, ChangeStop]);

  return (
    <div className="overflow-hidden bg-black sm:rounded-xl sm:mx-2 sm:mb-1">
      <div className="terminal h-[45vh] sm:h-[90vh] w-screen sm:w-[48vw] overflow-y-auto">
        <div className="flex items-end absolute  right-2">
          <button
            onClick={() => setValue([])}
            className="clear_terminal text-blue-400 text-xl border-2 border-blue-400 rounded-md p-1 m-2  hover:text-black hover:bg-blue-400 transition-all duration-500 ease-in-out h-fit"
            name="clear"
            title="Clear Terminal"
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
        <div className="terminalData mx-4 content">
          {
            // value.map((val, index) => (
            //   <div
            //     key={index}
            //     className="whitespace-pre py-1 my-1 tracking-widest text-wrap"
            //   >
            //     {/* {val} */}
            //   </div>
            // ))
          }
        </div>
      </div>
    </div>
  );
};

export default Excutor;
