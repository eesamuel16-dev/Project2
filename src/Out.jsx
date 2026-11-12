import React from 'react'
import { Link } from 'react-router-dom'


const Out = () => {
  return (
    <div className='text-red-700 h-screen'>Wrong page<br/> <Link to="/" className='underline'>Click here Navigate to home</Link></div>
  )
}

export default Out