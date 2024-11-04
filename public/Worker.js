self.onmessage = (e) => {
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
      originalConsole.log(args);
      if (typeof args[0] === "object") {
        return outputLog.push(JSON.stringify(args[0]));
      } else {
        return outputLog.push(args.join(" "));
      }
    };
    console.error = (...args) => {
      originalConsole.error(args);
      if (typeof args[0] === "object") {
        return outputLog.push(`Error: ${JSON.stringify(args[0])}`);
      } else {
        return outputLog.push(`Error: ${args.join(" ")}`);
      }
    };
    console.warn = (...args) => {
      originalConsole.warn(args);
      if (typeof args[0] === "object") {
        return outputLog.push(`Warning: ${JSON.stringify(args[0])}`);
      } else {
        return outputLog.push(`Warning: ${args.join(" ")}`);
      }
    };
    console.info = (...args) => {
      originalConsole.info(args);
      if (typeof args[0] === "object") {
        return outputLog.push(`Info: ${JSON.stringify(args[0])}`);
      } else {
        return outputLog.push(`Info: ${args.join(" ")}`);
      }
    };
    console.debug = (...args) => {
      originalConsole.debug(args);
      if (typeof args[0] === "object") {
        return outputLog.push(`Debug: ${JSON.stringify(args[0])}`);
      } else {
        return outputLog.push(`Debug: ${args.join(" ")}`);
      }
    };
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

    const res = is2DArr(args);
    let ent2DArrRes = false;
    let NewArr = [];
    if (res) {
      ent2DArrRes = isEntire2DArray(args[0]);
      checkLength(args);
      NewArr = args[0].map((val) => {
        if (Array.isArray(val)) {
          let spacesNo = maxLength - val.length;
          for (let i = 0; i < spacesNo; i++) {
            val.push("");
          }

          return val;
        } else {
          let spacesNo = maxLength;
          let genSpaces = [];
          for (let i = 0; i < spacesNo; i++) {
            genSpaces.push("");
          }
          return [...genSpaces, val];
        }
      });
    }
    headers = () => {
      if (ent2DArrRes) {
        return maxArr.map((_, i) => i);
      } else if (res) {
        let head = maxArr.map((_, i) => i);
        return [...head, "Values"];
      } else {
        return ["Values"];
      }
    };
    if (Array.isArray(args[0])) {
      const tableData = {
        headers: headers(),
        rows: !res
          ? args[0].map((val, i) => [i, val])
          : NewArr.map((val, i) => {
              if (Array.isArray(val)) {
                return [i, ...val];
              } else {
                return maxArr.map((_, j) => {
                  if (j === maxArr.length - 1) {
                    return val;
                  } else {
                    if (j === 0) {
                      return i;
                    } else {
                      return null;
                    }
                  }
                });
              }
            }),
      };
      //   const table = (
      //     <table className="ConsoleTable w-1/2 border-2 border-black">
      //       <thead>
      //         <tr>
      //           <th>(Index)</th>
      //           {res ? (
      //             maxArr.map((_, i) => <th key={uuidv4()}>{i}</th>)
      //           ) : (
      //             <th key={uuidv4()}>Values</th>
      //           )}
      //           {!ent2DArrRes && res && <th key={uuidv4()}>Values</th>}
      //         </tr>
      //       </thead>
      //       <tbody>
      //         {!res
      //           ? args[0].map((val, i) => (
      //               <tr key={uuidv4()}>
      //                 <td key={uuidv4()}>{i}</td>
      //                 <td key={uuidv4()}>{val}</td>
      //               </tr>
      //             ))
      //           : args[0].map((val, i) => (
      //               <tr key={uuidv4()}>
      //                 <td key={uuidv4()}>{i}</td>
      //                 {Array.isArray(val)
      //                   ? val.map((subval) => <td key={uuidv4()}>{subval}</td>)
      //                   : maxArr.map((_, j) =>
      //                       j === maxArr.length - 1 ? (
      //                         <div key={uuidv4()}>
      //                           <td key={uuidv4()}></td>
      //                           <td key={uuidv4()}>{val}</td>
      //                         </div>
      //                       ) : (
      //                         <td key={uuidv4()}>{""}</td>
      //                       )
      //                     )}
      //               </tr>
      //             ))}
      //       </tbody>
      //     </table>
      //   );
      outputLog.push(tableData);
    }
  };

  // Evaluate code
  const evaluateCode = () => {
    try {
      e.data ? eval(e.data) : eval(localStorage.getItem("code"));
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
  //   setValue(outputLog);
  self.postMessage(outputLog);
};
