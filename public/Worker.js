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

    // function that check if array is 2D
    const is2DArr = (arr) =>
      Array.isArray(arr[0]) && arr[0].some(Array.isArray);

    // function that check if array is entirely 2D
    const isEntire2DArray = (arr) =>
      arr.every((subarray) => Array.isArray(subarray));

    // Check length of subarrays and find max length
    const checkLength = (arr) => {
      arr[0].forEach((subarr) => {
        if (subarr.length > maxLength) {
          maxLength = subarr.length;
          maxArr = subarr;
        }
      });
    };

    // checking if array is 2D
    const res = is2DArr(args);
    // checking if array is entirely 2D
    let ent2DArrRes = false;

    let NewArr = [];

    if (res) {
      ent2DArrRes = isEntire2DArray(args[0]);
      checkLength(args);
      // adding empty strings to subarrays
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

    // function that returns headers
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

      outputLog.push(tableData);
    }
  };

  // Evaluate code
  const evaluateCode = () => {
    try {
      e.data ? eval(e.data) : eval(localStorage.getItem("code"));
    } catch (error) {
      outputLog.push(`Error: ${error.message}`);
    }
  };

  // Execute evaluation
  overwriteConsole();
  evaluateCode();
  restoreConsole();

  // Set output log
  self.postMessage(outputLog);
};
