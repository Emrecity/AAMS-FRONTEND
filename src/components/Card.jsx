import React from 'react'

const Card = ({text,number}) => {
  const style = (number>5)?'text-blue-400 text-xl mt-5 border border-t-blue-300 font-bold':'text-red-300 text-xl mt-5 font-bold border border-t-red-300 '
  return (
    <div className='shadow-xl text-center w-fit sm:w-full h-full p-10 border border-red-400'>
        <h1 className='text-3xl text-[#5B0101] font-extrabold'>{text}</h1>
       {number && <p className={style}>{number}</p>}
    </div>
  )
}

export default Card