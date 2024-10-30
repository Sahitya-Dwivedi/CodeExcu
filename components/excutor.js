import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

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
                  {val.headers.map((val, i) => {
                    return <th key={uuidv4()}>{val}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {val.rows.map((val, i) => {
                  return (
                    <tr key={uuidv4()}>
                      {Array.isArray(val) &&
                        val.map((subval) => {
                          const checkSub = val.findIndex((val) => val === null);
                          // if (checkSub === -1) {
                          //   return <td key={uuidv4()}>{subval}</td>;
                          // } else {
                          //   if (i== checkSub ) {
                          //     console.log("null found",checkSub);
                          //     return (
                          //       <>
                          //         <td key={uuidv4()}></td>
                          //         <td key={uuidv4()}></td>
                          //         <td key={uuidv4()}>{subval}</td>
                          //       </>
                          //     );
                          //   } else {
                          //     return (
                          //       <>
                          //         <td key={uuidv4()}>{subval}</td>
                          //       </>
                          //     );
                          //   }
                          // }
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
      console.log(e.data);
    };
  }, [code]);

  useEffect(() => {
    if (toRun) {
      handleEval();
      ChangeRun(false);
    }
  }, [ChangeRun, handleEval, toRun]);
  return (
    <div className="bg-red-900 h-[90vh] w-[50vw] overflow-auto scroll-smooth">
      {value.map((val) => (
        <div key={uuidv4()}>{val}</div>
      ))}
    </div>
  );
};

export default Excutor;
