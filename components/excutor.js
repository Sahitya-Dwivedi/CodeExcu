import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
    const OriginalConsoleTable = console.table;

    // overwriting console
    console.log = (...args) => {
      outputLog.push(args.join(" "));
    };

    console.error = (...args) => {
      outputLog.push(`Error: ${args.join(" ")}`);
    };

    console.warn = (...args) => {
      outputLog.push(`Warning: ${args.join(" ")}`);
    };

    console.info = (...args) => {
      outputLog.push(`Info: ${args.join(" ")}`);
    };

    console.debug = (...args) => {
      outputLog.push(`Debug: ${args.join(" ")}`);
    };

    console.table = (...args) => {
      let maxLength = 0;
      let maxArr = [];

      // check 2d array
      function is2DArr(arr) {
        return Array.isArray(arr[0]) && arr[0].some(Array.isArray);
      }
      // check if their 2d array is entire 2d
      function isEntire2DArray(arr) {
        return arr.every((subarray) => Array.isArray(subarray));
      }

      // check and get longest array in 2d array
      function CheckLength(arr) {
        arr[0].forEach((subarr) => {
          if (subarr.length > maxLength) {
            maxLength = subarr.length;
            maxArr = subarr;
          }
        });
      }

      // create empty spaces in a array
      function createEmptySpaces(arr) {
        let spacesNo = maxLength - arr.length;
        if (Array.isArray(arr)) {
          arr.forEach((val) => {
            if (!val) {
              throw new SyntaxError("Array should not have empty values(,,)");
            }
          });
        }
        for (let i = 0; i < spacesNo; i++) {
          arr.push("");
        }
      }
      const res = is2DArr(args);
      let Ent2DArrRes = false;
      if (res) {
        Ent2DArrRes = isEntire2DArray(args[0]);
      }
      if (res) {
        CheckLength(args);
        args[0].map((val) => createEmptySpaces(val));
      }

      if (Array.isArray(args)) {
        let table = (
          <table className="ConsoleTable w-1/2 border-2 border-black">
            <thead>
              <tr>
                <th>(Index)</th>
                {res ? (
                  maxArr.map((_, i) => {
                    return <th key={uuidv4()}>{i}</th>;
                  })
                ) : (
                  <th key={uuidv4()}>Values</th>
                )}
                {!Ent2DArrRes && res && <th key={uuidv4()}>Values</th>}
              </tr>
            </thead>
            <tbody>
              {!res
                ? args[0].map((val, i) => {
                    return (
                      <tr key={uuidv4()}>
                        <td key={uuidv4()}>{i}</td>
                        <td key={uuidv4()}>{val}</td>
                      </tr>
                    );
                  })
                : args[0].map((val, i) => {
                    return (
                      <tr key={uuidv4()}>
                        <td key={uuidv4()}>{i}</td>
                        {Array.isArray(val)
                          ? val.map((Subval, j) => {
                              return <td key={uuidv4()}>{Subval}</td>;
                            })
                          : maxArr.map((_, j) => {
                              if (j === maxArr.length - 1) {
                                return (
                                  <React.Fragment key={uuidv4()}>
                                    <td key={uuidv4()}></td>
                                    <td key={uuidv4()}>{val}</td>
                                  </React.Fragment>
                                );
                              } else {
                                return <td key={uuidv4()}>{""}</td>;
                              }
                            })}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        );
        outputLog.push(table);
      }
    };
    // evaluating code
    try {
      code ? eval(code) : eval(localStorage.getItem("code"));
    } catch (error) {
      outputLog.push(`ErrorMsg: ${error.message}`);
    }

    // restoring console
    console.log = OriginalConsoleLog;
    console.error = OriginalConsoleError;
    console.warn = OriginalConsoleWarn;
    console.info = OriginalConsoleInfo;
    console.debug = OriginalConsoleDebug;
    console.table = OriginalConsoleTable;

    // setting value to output log
    setValue(outputLog);
  };
  return (
    <div className="bg-red-900 h-screen w-[50vw]">
      <button onClick={handleEval} className="bg-yellow-800">
        run
      </button>
      {value.map((val) => {
        return <div key={uuidv4()}>{val}</div>;
      })}
    </div>
  );
};

export default Excutor;
