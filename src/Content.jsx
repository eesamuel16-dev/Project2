import { useState, useEffect, useRef } from "react"
import { FaTrash, FaEdit } from "react-icons/fa"
import Request from "./Request"
function Content({ item, setItem, handlecheck, add, edtid, handledel, search, a, newA, inputref, ApiUrl }) {
    useEffect(() => {
        console.log("render")
    }, [item])

    async function save() {
        if (document.getElementById("edit").value) {
            let formatd = document.getElementById("edit").value.charAt(0).toUpperCase() + document.getElementById("edit").value.slice(1)
            let newdd = item.map(el => el.id == edtid ? { ...el, activities: formatd } : el)

               document.getElementById("editop").style.display = "none"

            //show inputs
            document.getElementById("srec").style.display = "block"
            document.getElementById("addid").style.display = "block"
            document.querySelector("#addbtn").style.display = "inline"
            setItem(newdd)

            let newl = newdd.filter(el => el.id == edtid)
            console.log(newl)
            let mtd = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({ activities: newl[0].activities })
            }
            let ret = `${ApiUrl}/${edtid}`

            let result =await Request(ret,mtd)

            //localstorage
         
        } else {
            alert("Not saved")
            document.getElementById("editop").style.display = "none"

            //Hide input
            document.getElementById("srec").style.display = "block"
            document.getElementById("addid").style.display = "block"
            document.querySelector("#addbtn").style.display = "inline"

        }
    }
    function edit(id) {
        edtid = id
        document.getElementById("editop").style.display = "block"
        document.getElementById("srec").style.display = "none"
        document.getElementById("addid").style.display = "none"
        document.querySelector("#addbtn").style.display = "none"

    }



    return (<div>
        <h1>Ecommerce test</h1>
        <div id="editop" style={{ display: "none" }}>
            <input id="edit" placeholder="Enter your edited text" />
            <button onClick={save}>save</button>
        </div>
        <br />
        <div style={{ display: "flex" }}>
            <input placeholder="Enter your item" id="addid" ref={inputref} />
            <button onClick={add} id="addbtn">Add</button>
        </div>

        <br />
        <input id="srec" placeholder="Search item" onChange={(e) => { newA(e.target.value) }} />
        <ul>
            {search().map(it => {
                return <li key={it.id}>
                    <input type="checkbox" checked={it.check} onChange={() => handlecheck(it.id)} />
                    <label htmlFor="" style={it.check ? { textDecoration: "line-through" } : null}>{it.activities}</label>
                    <FaTrash onClick={() => handledel(it.id)} />
                    <FaEdit style={{ fontSize: "20px", marginLeft: "20px", paddingTop: "10px" }} onClick={() => edit(it.id)} />
                </li>
            })}
        </ul>
        <p>{item.length == "0" ? "Your list is empty" : null}</p>
    </div>)

}
export default Content