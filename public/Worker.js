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
    const handleGroup = (...args) => {
      grpIndent += "\t";
      if (args.length > 0) {
        return handleLog(...args);
      } else return handleLog("console.group");
    };
    const handleGroupEnd = () => {
      grpIndent = grpIndent.slice(0, -1);
      return;
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
    console.table = (...args) =>
      outputLog.push(`${grpIndent}${handleTable(...args)}`);
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
    console.group = (...args) =>
      outputLog.push(`${grpIndent}${handleGroup(...args)}`);
    console.groupEnd = () => handleGroupEnd();
    console.groupCollapsed = (...args) =>
      outputLog.push(`${grpIndent}${handleGroup(...args)}`);
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
  };

  // Handle console.table
  const handleTable = (args) => {
    let maxLength = 0;
    let maxArr = [];
    let subLen = 0;
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
          if (Array.isArray(subarr)) {
            maxArr = subarr;
            subLen = maxLength;
          } else if (typeof subarr === "string") {
            maxLength = 1;
          }
          if (subLen != 0) {
            maxLength = subLen;
          }
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
        } else if (typeof val === "object") {
          return [val];
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
        return [...head, "Values", ...headersSet];
      } else if (typeof args[0] === "object" && Array.isArray(args[0])) {
        let headersSet = new Set();
        args[0].forEach((item) => {
          if (typeof item === "object" && !Array.isArray(item)) {
            Object.keys(item).forEach((key) => headersSet.add(key));
          }
        });
        if (headersSet.size > 0) return [...headersSet];
        else return [...headersSet, "Values"];
      } else {
        return ["Values"];
      }
    };

    // Function to ensure no item is repeated in headerKeys
    const ensureUniqueHeaders = (headers) => {
      return Array.from(new Set(headers));
    };
    let headerKeys = ensureUniqueHeaders(headers());

    // function that returns rows
    const rows = () => {
      if (!res) {
        const transformedArr = args[0].map((item) => [item]);
        return transformedArr.map((val, i) => {
          let rowSets = val
            .map((subval) => {
              if (Array.isArray(subval)) {
                return JSON.stringify([...subval]);
              } else if (typeof subval === "object" && !Array.isArray(subval)) {
                let objrow = Object.values(subval);

                let OgNum = 0;
                let num = -1;
                for (let i = 0; i < headerKeys.length; i++) {
                  let element = headerKeys[i];
                  objrow = objrow
                    .map((val) => {
                      if (subval[element] === val) {
                        let genSpaces = [];
                        num < 0 ? (num = i - OgNum) : (num = i - OgNum - 1);
                        OgNum = i;
                        for (let j = 0; j < num; j++) {
                          genSpaces.push("");
                        }
                        return [...genSpaces, val];
                      } else {
                        return val;
                      }
                    })
                    .flat(2);
                }

                return [objrow];
              } else {
                return subval;
              }
            })
            .flat(2);
          return [i, ...rowSets];
        });
      } else {
        return NewArr.map((val, i) => {
          if (Array.isArray(val)) {
            let rowSets = val
              .map((subval) => {
                if (Array.isArray(subval)) {
                  return JSON.stringify([...subval]);
                } else if (
                  typeof subval === "object" &&
                  !Array.isArray(subval)
                ) {
                  let objrow = Object.values(subval);

                  let OgNum = 0;
                  let num = -1;
                  for (let i = 0; i < headerKeys.length; i++) {
                    let element = headerKeys[i];
                    objrow = objrow
                      .map((val) => {
                        if (subval[element] === val) {
                          let genSpaces = [];
                          num < 0 ? (num = i - OgNum) : (num = i - OgNum - 1);
                          OgNum = i;
                          for (let j = 0; j < num; j++) {
                            genSpaces.push("");
                          }
                          return [...genSpaces, val];
                        } else {
                          return val;
                        }
                      })
                      .flat(2);
                  }

                  return [objrow];
                } else {
                  return subval;
                }
              })
              .flat(2);
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
        headers: headerKeys,
        rows: rows(),
      };
      outputLog.push(tableData);
    } else if (typeof args[0] === "object") {
      const tableData = {
        headers: headerKeys,
        rows: Object.entries(args[0]),
      };
      outputLog.push(tableData);
    }
  };

  // Evaluate code
  const evaluateCode = () => {
    try {
      eval(e.data);
    } catch (error) {
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
