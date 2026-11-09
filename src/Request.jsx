import React from 'react'

const Request = async (url='',option=null,errmsg=null) => {
    try{
            const response = await fetch(url,option)

            if(!response.ok){
                throw new Error('Not found,reload')
            }
    } catch(err){
            errmsg=err.message

            return errmsg
    }finally{

    }
}

export default Request