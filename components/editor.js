import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
const CodeEditor = ({ data }) => {
  const editor = useRef(null);
  const [value, setValue] =
    useState(`// ⚠️ Execution Notice\n// Some advanced or unusual JavaScript features may not be fully supported in this environment. Certain edge cases or constructs could have been executed incorrectly.\n// For your safety and security, please avoid running this code outside trusted environments.\n// If you need to verify results, use official tools and follow safe coding practices.
    `);
  const [width, setWidth] = useState(false);
  const handleEditorChange = (editorRef) => {
    editor.current = editorRef;
    saveToLocalStorage();
    data(editor.current);
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("code", editor.current);
  };
  useEffect(() => {
    const storedCode = localStorage.getItem("code");
    if (storedCode) {
      setValue(storedCode);
    }
    setWidth(window.innerWidth < 640);
  }, []);
  return (
    <div className="sm:mb-1 overflow-hidden">
      <Editor
        className="sm:rounded-xl overflow-y-auto w-[50vw] h-[90vh]"
        width={width ? "100vw" : "50vw"}
        height={width ? "50vh" : "90vh"}
        defaultLanguage="javascript"
        value={value}
        theme="hc-black"
        onChange={handleEditorChange}
      />
    </div>
  );
};

export default CodeEditor;
