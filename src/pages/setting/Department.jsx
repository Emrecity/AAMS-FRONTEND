import React from 'react'
import { useForm } from 'react-hook-form'

const Department = () => {

  const {register,handleSubmit} = useForm()

  return (
    <div>
     <h1 className='text-3xl uppercase text-red-700'>Department Page</h1><hr className='h-1 bg-red-900 mb-5'/>
     <div className='flex gap-x-5'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Initials</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>
      <form className='bg-[#DA8080] sm:p-8 rounded-xl '>
        <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'>Department Forms</h1>
        <div className='flex flex-col gap-y-2 my-3'>
          <label>Name</label>
          <input type='text' placeholder='department name' {...register('name',{required:'name is require'})}/>
        </div>
        <div className='flex flex-col gap-y-2 my-3'>
          <label>Initial</label>
          <input type='text' placeholder='department initials' {...register(' initials',{required:' initials is require'})}/>
        </div>
        <button className='font-bold text-xl py-2 mx-auto w-full mt-2'>Add</button>
      </form>
     </div>
    </div>
  )
}

export default Department