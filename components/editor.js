import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = () => {
  const editor = useRef(null);
  const [value, setValue] = useState(`// Your JavaScript code here`)

  const handleEditorChange = (editorRef) => {
    editor.current = editorRef;
    saveToLocalStorage();
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("code", editor.current);
  };
  useEffect(() => {
    const storedCode = localStorage.getItem("code");
    if (storedCode) {
      setValue(storedCode)
    }
  }, []);

  return (
    <Editor
      width={"50vw"}
      height={"100vh"}
      defaultLanguage="javascript"
      value={value}
      theme="vs-dark"
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
