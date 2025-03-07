self.onmessage = (e) => {
  let outputLog = [];
  let count = {};
  let timeCalc = {};
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
    groupEnd: console.groupEnd,
    groupCollapsed: console.groupCollapsed,
    time: console.time,
    timeEnd: console.timeEnd,
    timeLog: console.timeLog,
    // timeStamp: console.timeStamp, // Not supported in this site
    dir: console.dir,
    dirxml: console.dirxml,
    trace: console.trace,
    // profile: console.profile, // Not supported in this site
    // profileEnd: console.profileEnd, // Not supported in this site
    // exception: console.exception, // deprecated
    // memory: console.memory, // Shows memory stats in environments like Chrome
  };

  // Overwrite console methods
  const overwriteConsole = () => {
    const formatObject = (obj) => {
      return Object.entries(obj)
        .map(([key, value]) => {
          if (typeof value === "function") {
            return `${key}: ${`[Function: ${key}]`}`;
          } else if (typeof value === "string") {
            return `${key}: '${value}'`;
          } else if (typeof value === "object" && !Array.isArray(value)) {
            return `${key}: {${formatObject(value)}}`;
          } else if (Array.isArray(value)) {
            return `${key}: ${JSON.stringify(value)}`;
          } else {
            return `${key}: ${value}`;
          }
        })
        .join(", ");
    };

    const handleLog = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (Array.isArray(subargs)) {
            function replacer(arr) {
              arr.forEach((val, i) => {
                if (typeof val === "undefined") {
                  arr[i] = "undefined";
                } else if (Array.isArray(val)) {
                  replacer(val);
                }
              });
            }
            replacer(subargs);
            return JSON.stringify(subargs);
          } else if (subargs === null) {
            return "null";
          } else if (typeof subargs === "object") {
            return `{${formatObject(subargs)}}`;
          } else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return NewArgs;
    };

    const handleError = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (Array.isArray(subargs)) {
            function replacer(arr) {
              arr.forEach((val, i) => {
                if (typeof val === "undefined") {
                  arr[i] = "undefined";
                } else if (Array.isArray(val)) {
                  replacer(val);
                }
              });
            }
            replacer(subargs);
            return JSON.stringify(subargs);
          } else if (subargs === null) {
            return "null";
          } else if (typeof subargs === "object") {
            return `{${formatObject(subargs)}}`;
          } else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return `Error: ${NewArgs}`;
    };

    const handleWarn = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (Array.isArray(subargs)) {
            function replacer(arr) {
              arr.forEach((val, i) => {
                if (typeof val === "undefined") {
                  arr[i] = "undefined";
                } else if (Array.isArray(val)) {
                  replacer(val);
                }
              });
            }
            replacer(subargs);
            return JSON.stringify(subargs);
          } else if (subargs === null) {
            return "null";
          } else if (typeof subargs === "object") {
            return `{${formatObject(subargs)}}`;
          } else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return `Warning: ${NewArgs}`;
    };

    const handleInfo = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (Array.isArray(subargs)) {
            function replacer(arr) {
              arr.forEach((val, i) => {
                if (typeof val === "undefined") {
                  arr[i] = "undefined";
                } else if (Array.isArray(val)) {
                  replacer(val);
                }
              });
            }
            replacer(subargs);
            return JSON.stringify(subargs);
          } else if (subargs === null) {
            return "null";
          } else if (typeof subargs === "object") {
            return `{${formatObject(subargs)}}`;
          } else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return `Info: ${NewArgs}`;
    };

    const handleDebug = (...args) => {
      let NewArgs = args
        .map((subargs) => {
          if (Array.isArray(subargs)) {
            function replacer(arr) {
              arr.forEach((val, i) => {
                if (typeof val === "undefined") {
                  arr[i] = "undefined";
                } else if (Array.isArray(val)) {
                  replacer(val);
                }
              });
            }
            replacer(subargs);
            return JSON.stringify(subargs);
          } else if (subargs === null) {
            return "null";
          } else if (typeof subargs === "object") {
            return `{${formatObject(subargs)}}`;
          } else if (typeof subargs === "undefined") return "undefined";
          else if (typeof subargs === "symbol") return subargs.toString();
          else return subargs;
        })
        .join(" ");
      return `Debug: ${NewArgs}`;
    };

    const handleAssert = (condition, ...args) => {
      if (!condition) {
        let NewArgs = args
          .map((subargs) => {
            if (Array.isArray(subargs)) {
              function replacer(arr) {
                arr.forEach((val, i) => {
                  if (typeof val === "undefined") {
                    arr[i] = "undefined";
                  } else if (Array.isArray(val)) {
                    replacer(val);
                  }
                });
              }
              replacer(subargs);
              return JSON.stringify(subargs);
            } else if (subargs === null) {
              return "null";
            } else if (typeof subargs === "object") {
              return `{${formatObject(subargs)}}`;
            } else if (typeof subargs === "undefined") return "undefined";
            else if (typeof subargs === "symbol") return subargs.toString();
            else return subargs;
          })
          .join(" ");
        return `Assertion failed: ${NewArgs}`;
      }
    };

    const handleClear = () => {
      outputLog = [];
    };

    const handleCount = (label = "default") => {
      count = { ...count, [label]: count[label] ? count[label] + 1 : 1 };
      return `${label}: ${count[label]}`;
    };

    const handleCountReset = (label = "default") => {
      if (count[label]) {
        count = { ...count, [label]: 0 };
      } else {
        return `⚠️ Counter "${label}" does not exist`;
      }
    };

    const handleTime = (label = "default") => {
      timeCalc = { ...timeCalc, [label]: performance.now() };
    };

    const handleTimeEnd = (label = "default") => {
      if (timeCalc[label]) {
        const time = performance.now() - timeCalc[label];
        delete timeCalc[label];
        return `${label}: ${time.toFixed(2)}ms`;
      } else {
        return `⚠️ Timer "${label}" does not exist`;
      }
    };

    const handleTimeLog = (label = "default") => {
      if (timeCalc[label]) {
        const time = performance.now() - timeCalc[label];
        return `${label}: ${time.toFixed(2)}ms`;
      } else {
        return `⚠️ Timer "${label}" does not exist`;
      }
    };

    const handleDir = (args, options) => {
      if (options) {
        return "Console.dir: Options are not supported in this site.";
      }
      function formatObjectDir(obj) {
        return Object.entries(obj)
          .map(([key, value]) => {
            if (typeof value === "function") {
              return `\n\t${key}: ${`[Function: ${key}]`}`;
            } else if (typeof value === "string") {
              return `\n\t${key}: '${value}'`;
            } else if (typeof value === "object" && !Array.isArray(value)) {
              return `\n\t${key}: {${formatObjectDir(value)}\n\t}`;
            } else if (Array.isArray(value)) {
              return `\n\t${key}: ${JSON.stringify(value)}`;
            } else {
              return `\n\t${key}: ${value}`;
            }
          })
          .join(", ");
      }
      if (args === null) {
        return "null";
      } else if (typeof args === "object" && !Array.isArray(args)) {
        return `Object\n{${formatObjectDir(args)}\n}`;
      } else if (Array.isArray(args)) {
        function replacer(arr) {
          arr.forEach((val, i) => {
            if (typeof val === "undefined") {
              arr[i] = "undefined";
            } else if (Array.isArray(val)) {
              replacer(val);
            }
          });
        }
        replacer(args);
        return JSON.stringify(args);
      } else if (typeof args === "undefined") return "undefined";
      else if (typeof args === "symbol") return args.toString();
      else return args;
    };

    let grpIndent = "";
    let grpType = "";
    const handleGroup = (...args) => {
      grpIndent += "\t";
      if (args.length > 0) {
        return handleLog(...args);
      } else return handleLog(grpType);
    };

    const handleGroupEnd = () => {
      grpIndent = grpIndent.slice(0, -1);
      return;
    };

    /**
     * Handles tracing of function calls and logs the stack trace.
     *
     * @param {...any} args - The arguments to be logged.
     * @returns {string} The formatted log message with the stack trace.
     */
    const handleTrace = (...args) => {
      const err = new Error();
      Error.stackTraceLimit = Infinity;
      Error.prepareStackTrace = (err, stack) => {
        return stack
          .map((frame) => {
            if (frame.getFunctionName() != "console.trace") {
              return `${grpIndent}${
                frame.getFunctionName() || "anonymous"
              } at ${
                frame.getFileName() || "script.js"
              }:${frame.getLineNumber()}`;
            }
          })
          .join("\n");
      };
      Error.captureStackTrace(err, handleTrace);

      // Get the stack trace and split it into lines
      const stackLines = err.stack.split("\n");
      const replaceLastEvalWithAnonymous = (stackLines) => {
        const evalIndices = stackLines.reduce((acc, line, index) => {
          if (line.includes("eval")) acc.push(index);
          return acc;
        }, []);
        if (evalIndices.length > 1) {
          const lastEvalIndex = evalIndices[evalIndices.length - 2];
          stackLines[lastEvalIndex] = stackLines[lastEvalIndex].replace(
            "eval",
            "(anonymous)"
          );
        }

        return stackLines;
      };

      const updatedStackLines = replaceLastEvalWithAnonymous(stackLines);

      // Remove the last 3 lines from the stack trace
      const trimmedStackLines = updatedStackLines.slice(0, -2);

      // Join the trimmed stack lines back into a single string
      const trimmedStack = trimmedStackLines.join("\n");

      if (args.length > 0) {
        return `${handleLog(...args)}${trimmedStack}`;
      } else return `${handleLog("console.trace")}${trimmedStack}`;
    };

    console.log = (...args) =>
      outputLog.push(`${grpIndent}${handleLog(...args)}`);
    console.error = (...args) =>
      outputLog.push(`${grpIndent}${handleError(...args)}`);
    console.warn = (...args) =>
      outputLog.push(`${grpIndent}${handleWarn(...args)}`);
    console.info = (...args) =>
      outputLog.push(`${grpIndent}${handleInfo(...args)}`);
    console.debug = (...args) =>
      outputLog.push(`${grpIndent}${handleDebug(...args)}`);
    console.table = (args) => handleTable(args);
    console.assert = (condition, ...args) =>
      outputLog.push(`${grpIndent}${handleAssert(condition, ...args)}`);
    console.clear = () => outputLog.push(`${grpIndent}${handleClear()}`);
    console.count = (label) =>
      outputLog.push(`${grpIndent}${handleCount(label)}`);
    console.countReset = (label) =>
      outputLog.push(`${grpIndent}${handleCountReset(label)}`);
    console.time = (label) =>
      outputLog.push(`${grpIndent}${handleTime(label)}`);
    console.timeEnd = (label) =>
      outputLog.push(`${grpIndent}${handleTimeEnd(label)}`);
    console.timeLog = (label) =>
      outputLog.push(`${grpIndent}${handleTimeLog(label)}`);
    console.dir = (args, options) =>
      outputLog.push(`${grpIndent}${handleDir(args, options)}`);
    console.dirxml = (...args) =>
      outputLog.push(`${grpIndent}${handleLog(...args)}`);
    console.group = (...args) => {
      grpType = "console.group";
      outputLog.push(`${grpIndent}${handleGroup(...args)}`);
    };
    console.groupEnd = () => handleGroupEnd();
    console.groupCollapsed = (...args) => {
      grpType = "console.groupCollapsed";
      outputLog.push(`${grpIndent}${handleGroup(...args)}`);
    };
    console.trace = (...args) =>
      outputLog.push(`${grpIndent}${handleTrace(...args)}`);
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
    console.time = originalConsole.time;
    console.timeEnd = originalConsole.timeEnd;
    console.timeLog = originalConsole.timeLog;
    console.dir = originalConsole.dir;
    console.dirxml = originalConsole.dirxml;
    console.group = originalConsole.group;
    console.groupEnd = originalConsole.groupEnd;
    console.groupCollapsed = originalConsole.groupCollapsed;
    console.trace = originalConsole.trace;
  };

  // Handle console.table
  const handleTable = (args) => {
    originalConsole.table(args);
    // Check if the array is 1D, 2D or nested
    const is1DArray = (arr) =>
      Array.isArray(arr) && arr.every((val) => !Array.isArray(val));
    const is2DArray = (arr) =>
      Array.isArray(arr) && arr.every((val) => Array.isArray(val));
    const isNestedArray = (arr) =>
      Array.isArray(arr) && arr.some((val) => Array.isArray(val));

    // Stringify arrays
    function InDepthStringification(arr) {
      return arr.map((val) => {
        if (Array.isArray(val)) {
          return val.map((subVal) => {
            if (Array.isArray(subVal)) {
              return JSON.stringify(subVal);
            } else if (typeof subVal === "string") {
              return `'${subVal}'`;
            } else {
              return subVal;
            }
          });
        } else {
          return val;
        }
      });
    }

    // generating extra spaces for table
    const generateSpaces = (maxLength) => {
      let spaces = maxLength;
      return Array(spaces).fill(null);
    };

    // Replace holes with null
    const replaceHoles = (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
          replaceHoles(arr[i]);
        } else if (!(i in arr)) {
          arr.splice(i, 1);
          i--; // Adjust the index after removal
        }
      }
      return arr;
    };

    // Handle undefined and null values
    const handleUndefinedAndNull = (arr) => {
      return arr.map((val) => {
        if (Array.isArray(val)) {
          return handleUndefinedAndNull(val);
        } else if (val === undefined) {
          return "undefined";
        } else if (val === null) {
          return "null";
        } else {
          return val;
        }
      });
    };

    // Generate table
    const header = () => {
      let HeaderArgs = [...args];
      originalConsole.log("HeaderArgs", HeaderArgs);
      // handle undefined and null values in consolelog

      if (is1DArray(HeaderArgs)) return ["Value"];
      else if (is2DArray(HeaderArgs)) {
        let maxLength = Math.max(...HeaderArgs.map((arr) => arr.length));
        let transHeader = Array.from({ length: maxLength }, (_, i) => i);
        return transHeader;
      } else if (isNestedArray(HeaderArgs)) {
        let removal = [];
        let NumArrCount = 0;
        let maxLength = Math.max(
          ...HeaderArgs.map((arr) => (Array.isArray(arr) ? arr.length : 0))
        );
        const CountHolesInHeader = (arr) => {
          let holeCount = 0;
          for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
              holeCount += CountHolesInHeader(arr[i]);
            } else if (!(i in arr)) {
              // removal.push(i);
              holeCount++;
            }
          }
          return holeCount;
        };
        NumArrCount = CountHolesInHeader(HeaderArgs);
        const countArraysInHeader = (arr) => {
          return arr.reduce((count, val) => {
            if (Array.isArray(val)) {
              return count + 1;
            }
            return count;
          }, 0);
        };

        const validateAndRemove = (headerArr, numArrCount) => {
          headerArr.forEach((arr, index) => {
            if (Array.isArray(arr)) {
              const arrayCount = countArraysInHeader(arr);
              if (arrayCount === numArrCount) {
                removal.push(index);
              }
            }
          });
        };

        validateAndRemove(HeaderArgs, NumArrCount);

        // HeaderArgs = FindHolesInHeader(HeaderArgs);
        let transHeader = Array.from({ length: maxLength }, (_, i) => i).filter(
          (val) => !removal.includes(val)
        );

        return [...transHeader, "Values"];
      }
    };

    const rows = () => {
      if (is1DArray(args)) {
        let transRow = args.map((val, i) => [i, val]);
        return transRow;
      } else if (is2DArray(args)) {
        args = InDepthStringification(args);
        let transRow = args.map((arr, i) => [i, ...arr]);
        return transRow;
      } else if (isNestedArray(args)) {
        let maxLength = Math.max(
          ...args
            .map((arr) => (Array.isArray(arr) ? arr.length : 0))
            .filter((length) => !isNaN(length))
        );
        let transRow = args;
        transRow = InDepthStringification(transRow);
        transRow = handleUndefinedAndNull(transRow);

        transRow = transRow.map((arr, i) => {
          if (Array.isArray(arr)) {
            for (let i = 0; i < arr.length; i++) {
              if (Array.isArray(arr[i])) {
                replaceHoles(arr[i]);
              } else if (!(i in arr)) {
                arr.splice(i, 1);
                i--; // Adjust the index after removal
              }
            }
            return [i, ...arr, null];
          } else {
            return [i, ...generateSpaces(maxLength), arr];
          }
        });

        // handling arrays holes
        // transRow = [...replaceHoles(transRow)];
        return transRow;
      }
    };
    let table = {
      headers: header(),
      rows: rows(),
    };
    return outputLog.push(table);
  };

  // Evaluate code
  const evaluateCode = () => {
    try {
      eval(e.data);
    } catch (error) {
      originalConsole.error(error);
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
