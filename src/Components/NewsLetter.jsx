import React from 'react'

function NewsLetter() {
  return (
    <div className='lg:h-[45vh] lg:min-h-[30vh] min-h-[60vh] py-7 md:py-0 bg-black flex mx-auto flex-col text-white justify-center px-6 items-center gap-6'>
        <h1 className='text-3xl leading-16 font-bold text-center'>Subscribe to Our Newsletter</h1>
        <p className='text-center text-[#cccccc] max-w-[600px]'>
        Get weekly design inspirations, exclusive interviews and curated content delivered directly to your inbox.
        </p>
        <div className='flex md:flex-row md:gap-0   gap-2 flex-col  md:max-w-[500px] w-full'>
            <input type="text" className='bg-white py-3 grow-1 md:rounded-r-none  md:rounded-l-sm rounded-sm text-black px-3 border-0 outline-0' placeholder='Enter your email' />
            <button className='py-3 md:rounded-r-sm md:rounded-l-none  rounded-sm text-center px-4 bg-[#ad8e63] font-bold'>Subscribe</button>
        </div>
    </div>
  )
}

export default NewsLetter