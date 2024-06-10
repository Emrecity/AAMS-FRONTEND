import React,{ useEffect, useState} from 'react'
import AllRequestForm from './AllRequestForm'
import { useHodStore } from '../../controllers/HodStore'
import { useForm } from 'react-hook-form'


const Hod = () => {
 
    const submit  = useHodStore((state)=>state.createRequest)

    const firstname = localStorage.getItem('firstname')
    const lastname = localStorage.getItem('lastname')
    const middlename = localStorage.getItem('middlename')
    const gender = localStorage.getItem('gender')
    const email = localStorage.getItem('email')
    const phone = localStorage.getItem('phone')
    const department = localStorage.getItem('department')

    const {register,handleSubmit,formState:{isDirty}} = useForm()

    const [open,setOpen] = useState(false)
    const [data,setData1] = useState({
      firstname,
      lastname,
      middlename,
      gender,
      email,
      phone,
      department
    })

  return (
    <div className=' bg-slate-50 px-5 py-10'>
        <div className='flex justify-between mb-5'>
            <h1 className='font-extrabold text-sm sm:text-xl text-red-700 '>{!open?'H.O.Ds Request Form':'All Request'}</h1>
            <button onClick={()=>setOpen(!open)} className='shadow-md px-5 rounded-md text-xs sm:text-base text-white hover:bg-red-700'>{!open?'All Request':'Back'}</button>
        </div>
        {!open?
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 text-red-600'>
        <section className='grid grid-cols-1 gap-y-2 sm:grid-cols-2 sm:gap-x-5 sm:border-r-4 sm:pr-5 sm:border-r-red-400'>
          <h2 className='font-bold text-2xl mb-3 col-span-2'>H.O.Ds DETAILS</h2>
          <div className='flex flex-col gap-2 w-full col-span-2 sm:col-span-1'>
              <label for='fname'>First Name</label>
              <input type='text' value = {data?.firstname} id='fname'className='outline-red-400'/>
          </div>     
          <div className='flex flex-col gap-2 w-full col-span-2 sm:col-span-1'>
              <label for='Midname'>Middle Name</label>
              <input type='text' value={data?.middlename} placeholder='middle name' id='Midname'className='outline-red-400'/>
          </div>     
          <div className='flex flex-col gap-2 w-full col-span-2 sm:col-span-1'>
              <label for='lname'>Last Name</label>
              <input type='text' placeholder='last name' value={data?.lastname} id='lname'className='outline-red-400'/>
          </div>     
          <div className='flex flex-col gap-2 w-full col-span-2 sm:col-span-1'>
              <label for='gender'>Gender</label>
              <input type='text' placeholder='gender' value={(data?.gender||'loading')} id='gender'className='outline-red-400'/>
          </div>     
          <div className='flex flex-col gap-2 col-span-2'>
              <label for='email'>Email</label>
              <input type='email' value={data?.email} id='email'className='outline-red-400'/>
          </div>     
          <div className='flex flex-col gap-2 col-span-2'>
              <label for='phone'>Phone</label>
              <input type='tel' placeholder='phone'value={data?.phone} id='phone' className='outline-red-400'/>
          </div>     
          <div className='flex flex-col gap-2 col-span-2'>
              <label for='dep'>Department</label>
              <input type='text' placeholder='Department'value={data?.department} id='dep' className='outline-red-400'/>
          </div>     
        </section><hr className='sm:hidden h-1 bg-red-700 my-2'/>
        <section>
          <form onSubmit={handleSubmit(submit)}>
              <h2 className='font-bold text-2xl mb-5'>Make Request</h2>
              <div className='flex flex-col gap-2 mb-3'>
              <label for='assest'>Asset Name</label>
              <input type='text' placeholder=' name' id='asset'className='outline-red-400' {...register('name',{required:true})}/>
              </div>
              <div className='flex flex-col gap-2 mb-3'>
              <label for='description'>Description</label>
              <input type='text' placeholder=' description' id='description'className='outline-red-400' {...register('description',{required:true})}/>
              </div>
              <input type='text'  value={data?.department} className='hidden' {...register('department',{required:true})}/>
              <div className='flex flex-col gap-2 mb-5'>
              <label for='quantity'>Quantity</label>
              <input type='number' min={1} id='quantity'className='outline-red-400'{...register('quantity',{required:true,valueAsNumber:true})}/>
              </div>
              <button className='hover:bg-red-700 text-white shadow-md px-5 w-full rounded-lg sm:h-12'>Request</button>
          </form>
        </section>
  
      </div>:<AllRequestForm/>}

    </div>
  )
}

export default Hod