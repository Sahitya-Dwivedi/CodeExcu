"use client";
import React, { useState } from "react";
import CodeEditor from "@/components/editor";
import Navbar from "@/components/navbar";
import Excutor from "@/components/excutor";

const Home = () => {
  const [code, setCode] = useState("");
  const [run, setRun] = useState(false);

  return (
    <div className="flex flex-col justify-end items-end">
      <Navbar letRun={setRun} />
      <div className="flex justify-end items-end" >
        <CodeEditor data={setCode} />
        <Excutor code={code} toRun={run} ChangeRun={setRun} />
      </div>
    </div>
  );
};

export default Home;
