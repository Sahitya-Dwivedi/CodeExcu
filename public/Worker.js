self.onmessage = (e) => {
  let outputLog = [];
  let count = {};
  // Save original console methods
  const originalConsole = {
    log: console.log,
    error: console.error,
    warn: console.warn,
    info: console.info,
    debug: console.debug,
    table: console.table,
    assert: console.assert,
    clear: console.clear,
    count: console.count,
    countReset: console.countReset,
    group: console.group,
  };

  // Overwrite console methods
  const overwriteConsole = () => {
    console.log = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (typeof subargs === "object") {
            function replacer(arr) {
              arr.forEach((val, i) => {
                if (typeof val === "undefined") {
                  arr[i] = "undefined";
                } else if (Array.isArray(val)) {
                  replacer(val);
                }
              });
            }
            if (Array.isArray(subargs)) {
              replacer(subargs);
            }
            return JSON.stringify(subargs);
          } else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return outputLog.push(NewArgs);
    };
    console.error = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (typeof subargs === "object") return JSON.stringify(subargs);
          else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return outputLog.push(`Error: ${NewArgs}`);
    };
    console.warn = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (typeof subargs === "object") return JSON.stringify(subargs);
          else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return outputLog.push(`Warning: ${NewArgs}`);
    };
    console.info = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (typeof subargs === "object") return JSON.stringify(subargs);
          else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return outputLog.push(`Info: ${NewArgs}`);
    };
    console.debug = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (typeof subargs === "object") return JSON.stringify(subargs);
          else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return outputLog.push(`Debug: ${NewArgs}`);
    };
    console.table = (...args) => handleTable(args);
    console.assert = (condition, ...args) => {
      if (!condition) {
        let NewArgs = args
          .map((subargs) => {
            if (typeof subargs === "object") return JSON.stringify(subargs);
            else if (typeof subargs === "undefined") return "undefined";
            else if (typeof subargs === "symbol") return subargs.toString();
            else return subargs;
          })
          .join(" ");
        return outputLog.push(`Assertion failed: ${NewArgs}`);
      }
    };
    console.clear = () => {
      outputLog = [];
    };
    console.count = (label = "default") => {
      count = { ...count, [label]: count[label] ? count[label] + 1 : 1 };
      return outputLog.push(`${label}: ${count[label]}`);
    };
    console.countReset = (label = "default") => {
      count = { ...count, [label]: 0 };
    };
  };

  // Restore original console methods
  const restoreConsole = () => {
    console.log = originalConsole.log;
    console.warn = originalConsole.warn;
    console.info = originalConsole.info;
    console.error = originalConsole.error;
    console.debug = originalConsole.debug;
    console.table = originalConsole.table;
    console.assert = originalConsole.assert;
    console.clear = originalConsole.clear;
    console.count = originalConsole.count;
    console.countReset = originalConsole.countReset;
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
      arr[0] = arr[0].map((subarr) => {
        if (subarr === null) {
          return ["null"];
        } else if (subarr === undefined) {
          return ["undefined"];
        }
        return subarr;
      });
      arr[0].forEach((subarr) => {
        if (subarr.length > maxLength) {
          maxLength = subarr.length;
          maxArr = subarr;
          if (typeof subarr === "string") maxLength = 1;
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
    const headers = () => {
      let head = maxArr.map((_, i) => i);
      if (ent2DArrRes) {
        return head;
      } else if (res) {
        let headersSet = new Set();
        args[0].forEach((item) => {
          if (typeof item === "object" && !Array.isArray(item)) {
            Object.keys(item).forEach((key) => headersSet.add(key));
          }
        });
        return [...head, , "Values", ...headersSet];
      } else {
        return ["Values"];
      }
    };

    const rows = () => {
      if (!res) {
        return args[0].map((val, i) => [i, val]);
      } else {
        console.log(NewArr);
        return NewArr.map((val, i) => {
          if (Array.isArray(val)) {
            let rowSets = val.map((subval) => {
              if (Array.isArray(subval)) {
                return JSON.stringify([...subval]);
              } else if (typeof subval === "object" && !Array.isArray(subval)) {
                return [Object.values(subval)];
              } else {
                return subval;
              }
            }).flat(2);
            console.log(rowSets);
            return [i, ...rowSets];
          } else if (typeof val === "object" && !Array.isArray(val)) {
            let rowSets = new Set();
            Object.values(val).forEach((key) => rowSets.add(key));
            return [i, ...rowSets];
          }
        });
      }
    };
    if (Array.isArray(args[0])) {
      const tableData = {
        headers: headers(),
        rows: rows(),
      };
      outputLog.push(tableData);
    } else if (typeof args[0] === "object") {
      const tableData = {
        headers: headers(),
        rows: rows(),
      };
      outputLog.push(tableData);
    } else if (typeof args[0] === "object") {
      const tableData = {
        headers: headers(),
        rows: Object.entries(args[0]),
      };
      outputLog.push(tableData);
    }
  };

  // Evaluate code
  const evaluateCode = () => {
    try {
      e.data ? eval(e.data) : eval(localStorage.getItem("code"));
    } catch (error) {
      // originalConsole.error(error);
      outputLog.push(`${error}`);
    }
  };

  // Execute evaluation
  overwriteConsole();
  evaluateCode();
  restoreConsole();

  // Set output log
  self.postMessage(outputLog);
};
