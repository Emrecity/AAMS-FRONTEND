import React, {useState} from 'react'

const Department = ({close}) => {

  const [department,setDepartment] = useState('arabic')

  return (
    <>
    <ul className='flex gap-x-4 mt-5 mx-auto hover:cursor-pointer'>
      <li onClick={()=>{
          setDepartment('Arabic')
         
        }}>Arabic</li>

      <li onClick={()=>{
          setDepartment('English')
          
        }}>English</li>

      <li onClick={()=>{
          setDepartment('Accounting')
      
        }}>Accounting</li>

      <li onClick={()=>{
          setDepartment('Mathematic')
       
        }}>Mathematics</li>

      <li onClick={()=>{
          setDepartment('Hospitality')
       
        }}>Hospitality</li>

      <li onClick={()=>{
          setDepartment('Management')
         }}>Management</li>

      <li onClick={()=>{
          setDepartment('Economics')
          }}>Economics</li>

      <li onClick={()=>{
          setDepartment('Information Technology')
                  }}>Information Technology</li>

    </ul><hr className='h-1 bg-red-700 mb-3'/>
    <form className='w-full sm:w-fit p-3 sm:px-10 sm:py-5 bg-[#DA8080] text-white mx-auto'>
    
        <div className='flex flex-col'>
          <label>Name Of H.O.D</label>
          <input type='text' value={department} className='text-[#5B0101]'/>
        </div>
        <div className='flex flex-col my-3'>
          <label>Email</label>
          <input type='text' value={department} className='text-[#5B0101]'/>
        </div>
        <div className='flex flex-col'>
          <label>Phone Number</label>
          <input type='text' value={department} className='text-[#5B0101]'/>
        </div>
        <div className='flex flex-col my-3'>
          <label>Gender</label>
          <input type='text' value={department} className='text-[#5B0101]'/>
        </div>
        <div className='flex flex-col mb-3'>
          <label>Number Of Request</label>
          <input type='text' value={department} className='text-[#5B0101]'/>
        </div>
        <div className='flex flex-col'>
          <label>Number of Asset</label>
          <input type='text' value={department} className='text-[#5B0101]'/>
        </div>
     
    </form>
    <button onClick={close}>Back</button>
    </>
  )
}

export default Department