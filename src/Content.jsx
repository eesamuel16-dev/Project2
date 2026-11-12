import React from 'react'
import { Link } from 'react-router-dom'

const Content = ({search,view}) => {
   
    return (
    
    <div className=''>  
        <article>
            
                {search().map(pst => <div key={pst.id} className='border-1 font-serif'>
                   <Link to={`/post/${pst.id}`}> 
                    
                    <p>User: {pst.name}</p>
                    <p>Post: {pst.body.length > 25?pst.body.slice(0,25):pst.body}...</p>
                    <p>view:{view}</p>
                    </Link>
                   
                </div>)}
        </article>
    </div>
  )
}

export default Content