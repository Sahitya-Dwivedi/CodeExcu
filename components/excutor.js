import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

const Excutor = ({ code, toRun, ChangeRun }) => {
  const [value, setValue] = useState([]);

  const handleEval = useCallback(() => {
    let outputLog = [];

    // Save original console methods
    const originalConsole = {
      log: console.log,
      error: console.error,
      warn: console.warn,
      info: console.info,
      debug: console.debug,
      table: console.table,
    };

    // Overwrite console methods
    const overwriteConsole = () => {
      console.log = (...args) => {
        if (Array.isArray(args[0])) {
          outputLog.push(`[${args.join(" ")}]`);
        } else if (typeof args[0] === "object") {
          outputLog.push(JSON.stringify(args[0]));
        } else {
          outputLog.push(args.join(" "));
        }
      };
      console.error = (...args) => outputLog.push(`Error: ${args.join(" ")}`);
      console.warn = (...args) => outputLog.push(`Warning: ${args.join(" ")}`);
      console.info = (...args) => outputLog.push(`Info: ${args.join(" ")}`);
      console.debug = (...args) => outputLog.push(`Debug: ${args.join(" ")}`);
      console.table = (...args) => handleTable(args);
    };

    // Restore original console methods
    const restoreConsole = () => {
      console.log = originalConsole.log;
      console.warn = originalConsole.warn;
      console.info = originalConsole.info;
      console.error = originalConsole.error;
      console.debug = originalConsole.debug;
      console.table = originalConsole.table;
    };

    // Handle console.table
    const handleTable = (args) => {
      let maxLength = 0;
      let maxArr = [];

      const is2DArr = (arr) =>
        Array.isArray(arr[0]) && arr[0].some(Array.isArray);
      const isEntire2DArray = (arr) =>
        arr.every((subarray) => Array.isArray(subarray));

      const checkLength = (arr) => {
        arr[0].forEach((subarr) => {
          if (subarr.length > maxLength) {
            maxLength = subarr.length;
            maxArr = subarr;
          }
        });
      };
      const createEmptySpaces = (arr) => {
        let spacesNo = maxLength - arr.length;
        if (Array.isArray(arr)) {
          arr.forEach((val) => {
            if (!val) {
              throw new SyntaxError("Array should not have empty values");
            }
          });
        }
        if (Array.isArray(arr)) {
          for (let i = 0; i < spacesNo; i++) {
            arr.push("");
          }
        }
      };

      const res = is2DArr(args);
      let ent2DArrRes = false;
      if (res) {
        ent2DArrRes = isEntire2DArray(args[0]);
      }
      if (res) {
        checkLength(args);
        args[0].forEach((val) => createEmptySpaces(val));
      }

      if (Array.isArray(args)) {
        const table = (
          <table className="ConsoleTable w-1/2 border-2 border-black">
            <thead>
              <tr>
                <th>(Index)</th>
                {res ? (
                  maxArr.map((_, i) => <th key={uuidv4()}>{i}</th>)
                ) : (
                  <th key={uuidv4()}>Values</th>
                )}
                {!ent2DArrRes && res && <th key={uuidv4()}>Values</th>}
              </tr>
            </thead>
            <tbody>
              {!res
                ? args[0].map((val, i) => (
                    <tr key={uuidv4()}>
                      <td key={uuidv4()}>{i}</td>
                      <td key={uuidv4()}>{val}</td>
                    </tr>
                  ))
                : args[0].map((val, i) => (
                    <tr key={uuidv4()}>
                      <td key={uuidv4()}>{i}</td>
                      {Array.isArray(val)
                        ? val.map((subval) => <td key={uuidv4()}>{subval}</td>)
                        : maxArr.map((_, j) =>
                            j === maxArr.length - 1 ? (
                              <React.Fragment key={uuidv4()}>
                                <td key={uuidv4()}></td>
                                <td key={uuidv4()}>{val}</td>
                              </React.Fragment>
                            ) : (
                              <td key={uuidv4()}>{""}</td>
                            )
                          )}
                    </tr>
                  ))}
            </tbody>
          </table>
        );
        outputLog.push(table);
      }
    };

    // Evaluate code
    const evaluateCode = () => {
      try {
        code ? eval(code) : eval(localStorage.getItem("code"));
      } catch (error) {
        console.error(error);
        originalConsole.error(error);
        outputLog.push(`ErrorMsg: ${error.message}`);
      }
    };

    // Execute evaluation
    overwriteConsole();
    evaluateCode();
    restoreConsole();

    // Set output log
    setValue(outputLog);
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
