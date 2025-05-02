const { headers } = require("next/headers");

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

    const handleTable = (args) => {
      originalConsole.table(args);

      if (!Array.isArray(args) && typeof args !== "object") {
        outputLog.push(handleLog(args));
        return;
      }
      if (Array.isArray(args)) {
        let headerCache = null; // Cache for header results

        // Check if the array is 1D, 2D or nested
        const is1DArray = (arr) =>
          Array.isArray(arr) &&
          arr.every((val) => !Array.isArray(val) && typeof val !== "object");
        const is2DArray = (arr) =>
          Array.isArray(arr) && arr.every((val) => Array.isArray(val));
        const isNestedArray = (arr) =>
          Array.isArray(arr) && arr.some((val) => Array.isArray(val));

        // check if the array contain objects
        const isObjectArray = (arr) =>
          Array.isArray(arr) && arr.every((val) => typeof val === "object");
        const isObjectNestedArray = (arr) =>
          Array.isArray(arr) &&
          arr.some((val) => typeof val === "object" && !Array.isArray(val));

        // Stringify arrays
        function InDepthStringification(arr) {
          return arr.map((val) => {
            if (Array.isArray(val)) {
              return val.map((subVal) => {
                if (Array.isArray(subVal)) {
                  return JSON.stringify(subVal);
                } else if (typeof subVal === "string") {
                  return `'${subVal}'`;
                } else if (Number.isNaN(subVal)) {
                  return "NaN";
                } else if (typeof subVal === "boolean") {
                  return subVal ? "true" : "false";
                } else {
                  return subVal;
                }
              });
            } else {
              if (Array.isArray(val)) {
                return JSON.stringify(val);
              } else if (typeof val === "string") {
                return `'${val}'`;
              } else if (Number.isNaN(val)) {
                return "NaN";
              } else if (typeof val === "boolean") {
                return val ? "true" : "false";
              } else {
                return val;
              }
            }
          });
        }

        // generating extra spaces for table
        const generateSpaces = (length = 1) => {
          let spaces = header().length - length;
          return Array(spaces).fill(null);
        };

        // Replace holes with null
        /**
         * Recursively replaces holes (undefined elements) in an array with the next elements.
         *
         * @param {Array} arr - The array to process, which may contain nested arrays.
         * @returns {Array} The processed array with holes removed.
         */
        const replaceHoles = (arr) => {
          for (let i = 0; i < arr.length; i++) {
            if (Array.isArray(arr[i])) {
              replaceHoles(arr[i]);
            } else if (!(i in arr)) {
              replaceHoles(arr[i]);
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

        // handle Objects stringification
        const ObjStringification = (obj) => {
          let key = Object.keys(obj);
          let val = Object.values(obj);
          if (key.length > 1) {
            return `{${key
              .map(
                (k, i) =>
                  `${k}: ${typeof val[i] == "object" ? "[Object]" : val[i]}`
              )
              .join(", ")}}`;
          } else if (key.length == 0) {
            return "{}";
          } else if (key.length == 1) {
            return `${key}: ${typeof val == "object" ? "[Object]" : val}`;
          } else {
            return `${key}: ${val}`;
          }
        };

        function handleObjectArray(args, indReq = true) {
          let transRow = args;
          transRow = handleUndefinedAndNull(transRow);
          transRow = args.map((obj, i) => {
            let objHeader = header(obj);
            const row = [];
            objHeader.forEach((key) => {
              if (key in obj) {
                let result;
                if (
                  typeof obj[key] === "object" &&
                  !Array.isArray(obj[key]) &&
                  obj[key] !== null
                ) {
                  result =
                    obj[key] instanceof Date
                      ? obj[key].toString()
                      : ObjStringification(obj[key]);
                } else if (Array.isArray(obj[key])) {
                  result = `[${InDepthStringification(obj[key])}]`;
                } else if (typeof obj[key] === "string") {
                  result = `'${obj[key]}'`;
                } else if (Number.isNaN(obj[key])) {
                  result = "NaN";
                } else if (typeof obj[key] === "boolean") {
                  result = obj[key] ? "true" : "false";
                } else if (obj[key] === null) {
                  result = "null";
                } else if (typeof obj[key] === "undefined") {
                  result = "undefined";
                } else if (typeof obj[key] === "function") {
                  result = `${`[Function: ${key}]`}`;
                } else {
                  result = obj[key];
                }
                row.push(result);
              } else {
                row.push(undefined);
              }
            });
            return indReq
              ? [i, ...row, ...generateSpaces(row.length)]
              : [...row, ...generateSpaces(row.length)];
          });
          return transRow;
        }

        // Generate table

        const header = () => {
          // Return cached result if available
          if (headerCache !== null) {
            return headerCache;
          }

          function ProperArrCopy(arr) {
            if (!Array.isArray(arr)) return arr;
            let copy = new Array(arr.length);
            for (let i = 0; i < arr.length; i++) {
              if (i in arr) {
                copy[i] = ProperArrCopy(arr[i]);
              }
            }
            return copy;
          }

          // Get unique keys from all objects in the array
          /**
           * Gets all unique keys from an array of objects
           * @param {Array} objArray - Array of objects to extract keys from
           * @returns {Array} - Array of unique keys
           */
          function getUniqueObjectKeys(objArray) {
            //  [Array(2), {…}, 'Just a string', 42, {…}, null, undefined]
            const keysSet = new Set();
            objArray.forEach((obj) => {
              if (obj && typeof obj === "object" && !Array.isArray(obj)) {
                Object.keys(obj).forEach((key) => keysSet.add(key));
              }
            });
            return Array.from(keysSet);
          }
          let HeaderArgs = ProperArrCopy(args);

          // handle undefined and null values in consolelog
          // holes and undefined and sets and str in log
          if (is1DArray(HeaderArgs)) {
            headerCache = ["Value"];
          } else if (is2DArray(HeaderArgs)) {
            let maxLength = Math.max(
              ...HeaderArgs.map((arr) => arr.length).filter(
                (length) => !isNaN(length)
              )
            );

            // Counting the number of arrays in the header
            let OnlyArr = HeaderArgs.filter((arr) => Array.isArray(arr));
            let NumArr = OnlyArr.length;

            // finding the index of the holes in the header
            let holes = [];
            function findHoles(arr) {
              for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                  findHoles(arr[i]);
                } else if (!(i in arr)) {
                  holes.push(i);
                }
              }
              return holes;
            }

            findHoles(OnlyArr);

            // sorting holes array
            holes.sort((a, b) => a - b);

            // finding the number of index of the arrays in the header
            let elementIndexCount = {};
            let index;
            for (let i = 0; i < holes.length; i++) {
              index = holes[i];
              if (elementIndexCount[index]) {
                elementIndexCount[index]++;
              } else {
                elementIndexCount[index] = 1;
              }
            }
            let removal = [];
            for (const key in elementIndexCount) {
              if (NumArr == elementIndexCount[key]) {
                removal.push(parseInt(key));
              }
            }

            headerCache = Array.from({ length: maxLength }, (_, i) => i).filter(
              (val) => !removal.includes(val)
            );
          } else if (isObjectArray(HeaderArgs)) {
            headerCache = getUniqueObjectKeys(HeaderArgs);
          } else if (isObjectNestedArray(HeaderArgs)) {
            let maxLength = Math.max(
              ...HeaderArgs.map((arr) =>
                Array.isArray(arr) ? arr.length : 0
              ).filter((length) => !isNaN(length))
            );
            // Counting the number of arrays in the header
            let OnlyArr = HeaderArgs.filter((arr) => Array.isArray(arr));
            let NumArr = OnlyArr.length;

            // finding the index of the holes in the header
            let holes = [];
            function findHoles(arr) {
              for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                  findHoles(arr[i]);
                } else if (!(i in arr)) {
                  holes.push(i);
                }
              }
              return holes;
            }

            findHoles(OnlyArr);

            // sorting holes array
            holes.sort((a, b) => a - b);

            // finding the number of index of the arrays in the header
            let elementIndexCount = {};
            let index;
            for (let i = 0; i < holes.length; i++) {
              index = holes[i];
              if (elementIndexCount[index]) {
                elementIndexCount[index]++;
              } else {
                elementIndexCount[index] = 1;
              }
            }
            let removal = [];
            for (const key in elementIndexCount) {
              if (NumArr == elementIndexCount[key]) {
                removal.push(parseInt(key));
              }
            }

            let transHeader = Array.from(
              { length: maxLength },
              (_, i) => i
            ).filter((val) => !removal.includes(val));

            headerCache = [
              ...transHeader,
              ...getUniqueObjectKeys(HeaderArgs),
              "Values",
            ];
          } else if (isNestedArray(HeaderArgs)) {
            let maxLength = Math.max(
              ...HeaderArgs.map((arr) =>
                Array.isArray(arr) ? arr.length : 0
              ).filter((length) => !isNaN(length))
            );
            // Counting the number of arrays in the header
            let OnlyArr = HeaderArgs.filter((arr) => Array.isArray(arr));
            let NumArr = OnlyArr.length;

            // finding the index of the holes in the header
            let holes = [];
            function findHoles(arr) {
              for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                  findHoles(arr[i]);
                } else if (!(i in arr)) {
                  holes.push(i);
                }
              }
              return holes;
            }

            findHoles(OnlyArr);

            // sorting holes array
            holes.sort((a, b) => a - b);

            // finding the number of index of the arrays in the header
            let elementIndexCount = {};
            let index;
            for (let i = 0; i < holes.length; i++) {
              index = holes[i];
              if (elementIndexCount[index]) {
                elementIndexCount[index]++;
              } else {
                elementIndexCount[index] = 1;
              }
            }
            let removal = [];
            for (const key in elementIndexCount) {
              if (NumArr == elementIndexCount[key]) {
                removal.push(parseInt(key));
              }
            }

            let transHeader = Array.from(
              { length: maxLength },
              (_, i) => i
            ).filter((val) => !removal.includes(val));

            headerCache = [...transHeader, "Values"];
          }

          return headerCache;
        };

        const rows = () => {
          if (is1DArray(args)) {
            let transRow = args.map((val, i) => [i, val]);
            transRow = InDepthStringification(transRow);
            transRow = handleUndefinedAndNull(transRow);
            return transRow;
          } else if (is2DArray(args)) {
            let maxLength = Math.max(
              ...args
                .map((arr) => arr.length)
                .filter((length) => !isNaN(length))
            );
            args = InDepthStringification(args);
            args = handleUndefinedAndNull(args);

            let OnlyArr = args.filter((arr) => Array.isArray(arr));
            let NumArr = OnlyArr.length;

            // finding the index of the holes in the header
            let holes = [];
            function findHoles(arr) {
              for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                  findHoles(arr[i]);
                } else if (!(i in arr)) {
                  holes.push(i);
                }
              }
              return holes;
            }

            findHoles(OnlyArr);

            // sorting holes array
            holes.sort((a, b) => a - b);

            // finding the number of index of the arrays in the header
            let elementIndexCount = {};
            let index;
            for (let i = 0; i < holes.length; i++) {
              index = holes[i];
              if (elementIndexCount[index]) {
                elementIndexCount[index]++;
              } else {
                elementIndexCount[index] = 1;
              }
            }
            let removal = [];
            for (const key in elementIndexCount) {
              if (NumArr == elementIndexCount[key]) {
                removal.push(parseInt(key));
              }
            }

            let transRow = args.map((arr, i) => {
              if (Array.isArray(arr)) {
                for (let i = 0; i < arr.length; i++) {
                  if (Array.isArray(arr[i])) {
                    replaceHoles(arr[i]);
                  } else if (!(i in arr)) {
                    arr[i] = null;
                  }
                }
                arr = arr.filter((_, i) => !removal.includes(i));

                return [i, ...arr, ...generateSpaces(arr.length)];
              } else {
                return [i, ...generateSpaces(), arr];
              }
            });

            return transRow;
          } else if (isObjectArray(args)) {
            let transRow = handleObjectArray(args);
            return transRow;
          } else if (isObjectNestedArray(args)) {
            let transRow = args;
            transRow = InDepthStringification(transRow);
            transRow = handleUndefinedAndNull(transRow);

            let OnlyArr = transRow.filter((arr) => Array.isArray(arr));
            let NumArr = OnlyArr.length;

            // finding the index of the holes in the header
            let holes = [];
            function findHoles(arr) {
              for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                  findHoles(arr[i]);
                } else if (!(i in arr)) {
                  holes.push(i);
                }
              }
              return holes;
            }

            findHoles(OnlyArr);

            // sorting holes array
            holes.sort((a, b) => a - b);

            // finding the number of index of the arrays in the header
            let elementIndexCount = {};
            let index;
            for (let i = 0; i < holes.length; i++) {
              index = holes[i];
              if (elementIndexCount[index]) {
                elementIndexCount[index]++;
              } else {
                elementIndexCount[index] = 1;
              }
            }
            let removal = [];
            for (const key in elementIndexCount) {
              if (NumArr == elementIndexCount[key]) {
                removal.push(parseInt(key));
              }
            }
            transRow = transRow.map((arr, i) => {
              if (Array.isArray(arr)) {
                for (let i = 0; i < arr.length; i++) {
                  if (Array.isArray(arr[i])) {
                    replaceHoles(arr[i]);
                  } else if (!(i in arr)) {
                    arr[i] = null;
                  }
                }
                arr = arr.filter((_, i) => !removal.includes(i));

                return [i, ...arr, ...generateSpaces(arr.length)];
              } else if (typeof arr === "object") {
                let objArr = handleObjectArray([arr], false).flat(1);
                return [i, ...objArr];
              } else {
                return [i, ...generateSpaces(), arr];
              }
            });

            return transRow;
          } else if (isNestedArray(args)) {
            let transRow = args;
            transRow = InDepthStringification(transRow);
            transRow = handleUndefinedAndNull(transRow);

            let OnlyArr = transRow.filter((arr) => Array.isArray(arr));
            let NumArr = OnlyArr.length;

            // finding the index of the holes in the header
            let holes = [];
            function findHoles(arr) {
              for (let i = 0; i < arr.length; i++) {
                if (Array.isArray(arr[i])) {
                  findHoles(arr[i]);
                } else if (!(i in arr)) {
                  holes.push(i);
                }
              }
              return holes;
            }

            findHoles(OnlyArr);

            // sorting holes array
            holes.sort((a, b) => a - b);

            // finding the number of index of the arrays in the header
            let elementIndexCount = {};
            let index;
            for (let i = 0; i < holes.length; i++) {
              index = holes[i];
              if (elementIndexCount[index]) {
                elementIndexCount[index]++;
              } else {
                elementIndexCount[index] = 1;
              }
            }
            let removal = [];
            for (const key in elementIndexCount) {
              if (NumArr == elementIndexCount[key]) {
                removal.push(parseInt(key));
              }
            }
            transRow = transRow.map((arr, i) => {
              if (Array.isArray(arr)) {
                for (let i = 0; i < arr.length; i++) {
                  if (Array.isArray(arr[i])) {
                    replaceHoles(arr[i]);
                  } else if (!(i in arr)) {
                    arr[i] = null;
                  }
                }
                arr = arr.filter((_, i) => !removal.includes(i));

                return [i, ...arr, ...generateSpaces(arr.length)];
              } else {
                return [i, ...generateSpaces(), arr];
              }
            });

            return transRow;
          }
        };
        // rows();
        let table = {
          headers: header(),
          rows: rows(),
        };
        headerCache = null; // Reset cache after table is generated
        return outputLog.push(table);
      } else if (typeof args === "object") {
        let headerCache = null; // Cache for header results
        isObjectNested = (args) => {
          return Object.values(args).some((val) => typeof val === "object");
        };
        let header = () => {
          if (headerCache !== null) {
            return headerCache;
          }
          if (isObjectNested(args)) {
            let header = Object.keys(args);
            // Check for nested objects and include their keys
            const getAllKeys = (obj, keysSet = new Set()) => {
              for (const key in obj) {
                if (typeof obj[key] === "object" && obj[key] !== null) {
                  for (const nestedKey in obj[key]) {
                    keysSet.add(nestedKey);
                  }
                }
              }
              return Array.from(keysSet);
            };

            // Get all nested keys
            header = getAllKeys(args);
            headerCache= ["Value", ...header];
          } else {
            headerCache= ["Value"];
          }
          return headerCache;
        };

        let rows = () => {
          if (isObjectNested(args)) {
            let transRow = Object.entries(args).map(([key, val], i) => {
              if (typeof val === "object") {
                let v = Object.values(val).map((v) => {
                  if (typeof v === "object") {
                    return [JSON.stringify(v)];
                  } else if (typeof v === "string") {
                    return `'${v}'`;
                  } else if (Number.isNaN(v)) {
                    return "NaN";
                  } else if (typeof v === "boolean") {
                    return v ? "true" : "false";
                  } else if (v === null) {
                    return "null";
                  } else if (typeof v === "undefined") {
                    return "undefined";
                  } else if (typeof v === "function") {
                    return `${`[Function: ${key}]`}`;
                  } else {
                    return v;
                  }
                });
                return [key, ...v];
              }
              return [key, val];
            });
            originalConsole.log(transRow);
            return transRow;
          } else {
            let ent = Object.entries(args);
            ent = ent.map((val, i) => {
              if (typeof val[1] === "object") {
                return [i, ObjStringification(val[1])];
              } else if (typeof val[1] === "string") {
                return [i, `'${val[1]}'`];
              } else if (Number.isNaN(val[1])) {
                return [i, "NaN"];
              } else if (typeof val[1] === "boolean") {
                return [i, val[1] ? "true" : "false"];
              } else if (val[1] === null) {
                return [i, "null"];
              } else if (typeof val[1] === "undefined") {
                return [i, "undefined"];
              } else if (typeof val[1] === "function") {
                return [i, `${`[Function: ${val}]`}`];
              } else {
                return [i, val[1]];
              }
            });
            return ent;
          }
        };

        let table = {
          headers: header(),
          rows: rows(),
        };
        return outputLog.push(table);
      }
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

  // Evaluate code
  const evaluateCode = () => {
    try {
      eval(e.data);
    } catch (error) {
      originalConsole.error(error);
      originalConsole.trace(error);
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
