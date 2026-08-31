"use client";
import React, { useEffect, useState } from "react";
import CodeEditor from "@/components/editor";
import Navbar from "@/components/navbar";
import Excutor from "@/components/excutor";

const Home = () => {
  const [code, setCode] = useState("");
  const [run, setRun] = useState(false);
  const [stop, setStop] = useState(false);
  useEffect(() => {
    document.addEventListener("keypress", (e) => {
      if (e.key === "ṇ") {
        setRun(true);
      }
    });
  }, []);

  return (
    <div className="flex flex-col justify-end items-end bg-gradient-to-r from-[#0000ff] to-[#ee005f]  h-screen">
      <Navbar letRun={setRun} letStop={setStop} />
      <div className="flex justify-end items-end sm:flex-row flex-col-reverse">
        <CodeEditor data={setCode} />
        <Excutor code={code} toRun={run} ChangeRun={setRun} toStop={stop} ChangeStop={setStop} />
      </div>
    </div>
  );
};

export default Home;
