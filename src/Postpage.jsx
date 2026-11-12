import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import api from './post.js'
const Postpage = ({post,del,newPost}) => {
  const {id} = useParams()
  const pos = post.find(pt => pt.id == id)

  const [show,hide]=useState(false)
  function edt(id){
      console.log(id)
  }

  async function clic(){

    if(document.querySelector("#edtinput").value == ""){
      alert("Empty")
      hide(!show)
    }else{
     
      let edtitm = post.find(itm => itm.id == id)
      let update = {...edtitm,body:document.querySelector("#edtinput").value}
      let pst = await api.put(`/post/${id}`,update)
      newPost(post.map(itm => itm.id == id?pst.data:itm))

      hide(!show)
    }

  }
  return (
      <div className='h-screen'> 
         {pos?<div>
      {<p className=''>{pos.name}</p>}
      {<p>{pos.body}</p>}
      <button className='border-2 rounded p-1 font-serif' onClick={()=> hide(!show)}>Edit</button>
      <button className='border-2 rounded p-1 font-serif' onClick={() => del(pos.id)}>Delete</button>
    </div>:<div>
        <p>No element found</p>
        <Link to={'/'} className='underline font-bold text-gray-600'>Click to return to home page</Link>
    </div>}


      <div style={show?{display:"block"}:{display:"none"}}>
        <input placeholder='Enter your edited text' className='border-2 rounded pl-2' id='edtinput'/>
        <button className='border-2 font-serif px-1 rounded' onClick={clic}>Click</button>
      </div>
      </div>
   
  )
}

export default Postpage