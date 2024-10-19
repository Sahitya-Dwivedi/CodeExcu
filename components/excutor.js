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
    const OriginalConsoleTable = console.table;

    // // during designing need to design these also
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
        const spacesNo = maxLength - arr.length;
        for (let i = 0; i < spacesNo; i++) {
          arr.push("");
        }
      }
      const res = is2DArr(args);
      let Ent2DArrRes = false;
      if (res) {
        Ent2DArrRes = isEntire2DArray(args[0]);
      }
      CheckLength(args);
      args[0].map((val) => createEmptySpaces(val));

      // splitting arr if Ent2DArrRes is true
      let SubArrArray;
      let ArrArray;
      if (!Ent2DArrRes) {
        SubArrArray = args[0].filter((val) => Array.isArray(val));
        ArrArray = args[0].filter((val) => !Array.isArray(val));
      }
      if (Array.isArray(args)) {
        let table = (
          <table className="w-1/2 border-2 border-black">
            <thead className="border-2 border-black">
              <tr>
                <th className="border-2 border-black">(Index)</th>
                {res ? (
                  maxArr.map((_, i) => {
                    return (
                      <th key={i} className="border-2 border-black">
                        {i}
                      </th>
                    );
                  })
                ) : (
                  <th className="border-2 border-black">Value</th>
                )}
                {!Ent2DArrRes && <th>Values</th>}
              </tr>
            </thead>
            <tbody className="border-2 border-black">
              {!res
                ? args[0].map((val, i) => {
                    return (
                      <tr key={i}>
                        <td className="border-2 border-black">{i}</td>
                        <td className="border-2 border-black">{val}</td>
                      </tr>
                    );
                  })
                : args[0].map((val, i) => {
                    return (
                      <tr key={i}>
                        <td className="border-2 border-black">{i}</td>
                        {Ent2DArrRes &&
                          val.map((Subval, j) => {
                            return (
                              <td key={j} className="border-2 border-black">
                                {Subval}
                              </td>
                            );
                          })}
                        {!Ent2DArrRes &&
                          SubArrArray.map((val, k) => {
                           return val.map((subVal, b) => {
                              return <td key={b}>{subVal}</td>;
                            });
                          })}
                        {!Ent2DArrRes &&
                          ArrArray.map((val, k) => {
                            return <td key={k}>{val}</td>;
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
        return <div key={Math.random()}>{val}</div>;
      })}
    </div>
  );
};

export default Excutor;
