import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './post.js'
const Newpost = ({ post, newPost }) => {
  const navigate = useNavigate()
  async function add() {
    let name = document.getElementById('name').value
    let tn = document.getElementById('pozt').value
    //let i = post.length ? Number(post[post.length - 1].id) + 1 : 1

    let neList = {
      id:Date.now(),
      name: name.charAt(0).toUpperCase() + name.slice(1),
      body: tn.charAt(0).toUpperCase() + tn.slice(1),
      check: false
    }
    try{
      const response = await api.post('/post',neList)
    newPost([...post, response.data])

    navigate('/')
    }catch(err){
      console.log(err.message)
    }
  }
  return (
    <div className='h-screen'>
      <div className='flex flex-col justify-center text-center items-center gap-2 p-4 m-2 bg-blue-50 w-fit ml-auto mr-auto'>
        <input className='border w-[200px] rounded pl-2' placeholder='Enter your name' id='name' />
        <input className='border w-[200px] rounded pl-2' placeholder='Enter your post' id='pozt' />
        <button className='border w-[100px] rounded hover:bg-gray-200 traansition-all duration-200' onClick={add}>Add</button>
      
      </div>
    </div>
  )
}

export default Newpost