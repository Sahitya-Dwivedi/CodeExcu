"use client"
import React from 'react'
import CodeEditor from '@/components/editor'
import Navbar from '@/components/navbar'

const Home = () => {
  return (
    <div className='overflow-hidden flex flex-col scroll-smooth'>
      <Navbar />
      <CodeEditor />
    </div>
  )
}

export default Home
