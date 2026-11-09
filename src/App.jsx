import React from 'react'
import { FaTrash } from 'react-icons/fa';
import Content from '/src/Content';
import { useState, useRef, useEffect } from "react"
import Footer from './Footer';
import Request from './Request';
const App = () => {
  const ApiUrl = "http://localhost:3000/item"

  let [a, newA] = useState("")

  let edtid = 0

  const [item, setItem] = useState([])
  const [e, setE] = useState("")
  const [load, isLoad] = useState(true)
  useEffect(() => {
    setTimeout(() => {
      (async function(){
        try {
          const response = await fetch(ApiUrl)
          if (!response.ok) {
            throw new Error("Error: " + "Couldn't connect to restapi,check your link")
          }
          const listitem = await response.json()
          
          setItem(listitem)
          
          isLoad(false)
        } catch (eer) {
           
            setE(eer.message)
        } finally {

        }
      })()
    }, 2000)

  }, [])


  let inputref = useRef()

  const handlecheck =async (id) => {

    let newl = item.map((itm) => itm.id == id ? { ...itm, check: !itm.check } : itm)


    setItem(newl)

    const i = newl.filter(ite => ite.id == id)

    const mtd = {
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({check:i[0].check})
    }

    let resurl = `${ApiUrl}/${id}`

    let result = await Request(resurl,mtd)
  }

  async function add() {

    inputref.current.focus()
    let formatd = document.getElementById("addid").value.trim().charAt(0).toUpperCase() + document.getElementById("addid").value.trim().slice(1)
    inputref.current.focus()
    let nwadd = { id: Date.now(), activities: formatd.trim(), check: false }


    // localStorage.setItem("my list", JSON.stringify([...item, nwadd]))
    setItem([...item, nwadd])

    document.getElementById("addid").value = ""

    const mtd ={
      method:"POST",
      headers:{
        'Content-type':"application/json"
      },
      body:JSON.stringify(nwadd)
    }

    const result = await Request(ApiUrl,mtd)
    if (result) setE(result)
  }


  function handledel(id) {
    const filter = item.filter(el => el.id != id)

    

    // localStorage.setItem("my list", JSON.stringify(filter))
    setItem(filter)

    let del = {method:"DELETE"}
    let rt= `${ApiUrl}/${id}`
    let res = Request(rt,del)

  }

  function search() {

    let filtered = item.filter(el => { return el.activities.toLowerCase().includes(a.toLowerCase()) })
    if (filtered) {
      return filtered
    }

  }

  return (

    <>
      
      { e ?
      <p>{e}</p>:
      load?
        <p>it is loading</p>:
        <><Content item={item} setItem={setItem} inputref={inputref} handlecheck={handlecheck} add={add} handledel={handledel} search={search} a={a} newA={newA} edtid={edtid} ApiUrl={ApiUrl} />
          <Footer item={item} />
        </>
      }
    </>

  )
}

export default App