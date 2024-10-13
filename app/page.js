"use client";
import React, { useState } from "react";
import CodeEditor from "@/components/editor";
import Navbar from "@/components/navbar";
import Excutor from "@/components/excutor";

const Home = () => {
  const [code, setCode] = useState("")
  return (
    <div className="overflow-hidden flex flex-col scroll-smooth">
      <Navbar />
      <div className="flex justify-between items-center">
      <CodeEditor data={setCode}/>
      <Excutor code={code}/>
      </div>
    </div>
  );
};

export default Home;
