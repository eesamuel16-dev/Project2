import React, { useEffect, useState } from 'react'
import Content from './Content'
import Change from './Change'
import Header from './Header'
import { Routes,Route,BrowserRouter,useNavigate } from "react-router-dom";
import Footer from './Footer';
import Postpage from './Postpage';
import Newpost from './Newpost';
import About from './About';
import Out from './Out'
import api from './post.js'
import { error } from 'three/webgpu';
const App = () => {
  const [sett,nwSett] = useState("")
  const [view,setView] = useState(0)
  const [post,newPost] = useState( [
   
  ])

  useEffect(() => {
       (async function(){
        try{
          const response = await api.get('/post')
          newPost(response.data)
      }catch(err){
          console.log(err.response)
      }
      
    })()

     
  },[])
  const navigate = useNavigate()

  async function del(id){
    const filtered = post.filter(pt => pt.id != id)
   const del = await api.delete(`/post/${id}`)
    newPost(filtered)
    navigate('/')
  }

  function search(){
    let sea = post.filter(item => item.name.toLowerCase().includes(sett.toLowerCase()) || item.id == sett)
   if(sea){
    return sea
  }
  }
  console.log(post)
  return (
    <div className='bg-white text-black h-fit'>
      <Header search={search} post={post} nwSett={nwSett}/>
    
            <Routes>
                <Route path={'/'} element={<Content search={search} view={view} setView={view}/>}/>
                <Route path={'/post/:id'} element={<Postpage post={post} del={del} newPost={newPost}/>}/>
                <Route path={'/post'} element={<Newpost post={post} newPost={newPost}/>}/>
                <Route path={'/about'} element={<About post={post}/>}/>
                <Route path={'*'} element={<Out/>}/>
            </Routes>
            <Footer/>
       
    </div>
     
   
  )
}

export default App