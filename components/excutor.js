import React from 'react'

const Excutor = ({code}) => {
  console.log("child", code);
  
  return (
    <div>
      {code}
    </div>
  )
}

export default Excutor
