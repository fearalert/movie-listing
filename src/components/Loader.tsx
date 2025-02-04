import React from 'react'
import {Loader2} from 'lucide-react';

const Loader = () => {
  return (
    <div role='status' className='flex flex-col justify-center items-center'>
        <Loader2 className='text-white'/>
        <p className='text-white'>Loading Data...</p>
    </div>
  )
}

export default Loader