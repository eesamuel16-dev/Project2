import { Link, useParams } from 'react-router-dom'
import React from 'react'



const Header = ({search,post,nwSett}) => {
    let {id} = useParams()


    

    return (
        <div>
             <div className='flex flex-col sm:flex-row sm:justify-between  sm:items-center bg-slate-800 text-white font-semibold pt-1 sticky top-2'>
           <div>
            <h1>Facebook blog</h1>
            <input placeholder='Search' className='border-1 rounded-[20px] pl-2' onChange={(e) => nwSett(e.target.value)}/>
            </div> 
            <ul className='flex gap-1 sm:mx-auto'>
                <li className='hover:bg-white hover:text-black transition-all duration-100'><Link to={'/'}>Home</Link></li>
                <li className='hover:bg-white hover:text-black transition-all duration-100'><Link to={'/post'}>Post</Link></li>
                {/* <li className='hover:bg-white hover:text-black transition-all duration-100'>Pricing</li> */}
            </ul>
        </div>
        </div>
       
    )
}

export default Header