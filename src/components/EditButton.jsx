import React from 'react'

const EditButton = ({handleClick}) => {
  return (
    <button className="bg-blue-500 hover:bg-blue-600 w-10 mx-1 btn rounded-md text-white"
    onClick={handleClick}
    >
            <div className="group relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                </svg>
                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-800 text-white text-sm rounded-md py-2 absolute z-10 bottom-full -left-1/2 ml-20 transition-all duration-300">
                    Edit
                    <div className="arrow absolute w-3 h-3 bg-gray-800 border-t border-left transform rotate-45 -mt-1 ml-1"></div>
                </div>
            </div>
        </button>
  )
}

export default EditButton
