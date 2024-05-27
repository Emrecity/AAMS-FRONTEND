import React from 'react'

const Card = ({text}) => {
  return (
    <div className='shadow-xl text-center w-fit p-10 border border-red-400'>
        <h1 className='text-3xl text-[#5B0101] font-extrabold'>{text}</h1>
    </div>
  )
}

export default Card