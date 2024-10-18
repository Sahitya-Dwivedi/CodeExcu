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

    console.table = (...args) => {
      let maxLength = 0;
      let maxArr = [];

      // check 2d array
      function is2DArr(arr) {
        return Array.isArray(arr[0]) && arr[0].some(Array.isArray);
      }

      // check and get longest array in 2d array
      function CheckLength(arr) {
        arr[0].forEach((subarr) => {
          if (subarr.length > maxLength) {
            maxLength = subarr.length;
            maxArr = subarr;
          }
          return maxArr, maxLength;
        });
      }
      const res = is2DArr(args);
      CheckLength(args);
      if (Array.isArray(args)) {
        let table = (
          <table className="w-full border-2 border-black">
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
                : args[0].map((val, i) => {})}
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
