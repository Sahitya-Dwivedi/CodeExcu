import React, { useRef } from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = () => {
  const editor = useRef(null);
  
  const handleEditorChange = (editorRef) => {
    editor.current = editorRef;
    console.log(editor.current);
    
  };
  return (
    <Editor
      width={"50vw"}
      height={"100vh"}
      defaultLanguage="javascript"
      value={`// Your JavaScript code here`}
      theme="vs-dark"
      onChange={handleEditorChange}
    />
  );
};

export default CodeEditor;
