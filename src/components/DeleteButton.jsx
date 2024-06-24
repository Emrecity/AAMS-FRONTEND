import React from 'react'
import {toast} from 'react-hot-toast'
import Swal from 'sweetalert2'

const DeleteButton = ({handleClick}) => {
    const confirm = ()=>{
        return(
        Swal.fire({
            title:'Confirmation message',
            text:'Do you want to delete it',
            icon:'warning',
            showCancelButton:'true',
            cancelButtonColor:'#d33'
        }).then((result)=>{
            if(result.isConfirmed){
                toast.success('Deleted successufully')
            }
        })
    )
    }
    const HandleFunction = (handleClick? handleClick:confirm)
      
  return (
    <button className="bg-red-500 hover:bg-red-600 w-10 mx-1 btn rounded-md text-white"
    onClick={HandleFunction}
    >
            <div className="group relative">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
                <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible bg-gray-800 text-white text-sm rounded-md py-2 absolute z-10 bottom-full -left-1/2 ml-20 transition-all duration-300">
                    Delete
                    <div className="arrow absolute w-3 h-3 bg-gray-800 border-t border-left transform rotate-45 -mt-1 ml-1"></div>
                </div>
            </div>
        </button>
  )
}

export default DeleteButton
