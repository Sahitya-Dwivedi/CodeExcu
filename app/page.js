"use client";
import React, { useEffect, useState } from "react";
import CodeEditor from "@/components/editor";
import Navbar from "@/components/navbar";
import Excutor from "@/components/excutor";

const Home = () => {
  const [code, setCode] = useState("");
  const [run, setRun] = useState(false);
  useEffect(() => {
    alert("The making is in progress. current functioning can be incomplete also");
  }, [])
  
  return (
    <div className="flex flex-col justify-end items-end bg-gradient-to-r from-[#0000ff] to-[#ee005f]  h-screen">
      <Navbar letRun={setRun} />
      <div className="flex justify-end items-end" >
        <CodeEditor data={setCode} />
        <Excutor code={code} toRun={run} ChangeRun={setRun} />
      </div>
    </div>
  );
};

export default Home;
