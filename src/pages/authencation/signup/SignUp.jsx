import React from 'react'
import { useForm } from 'react-hook-form'
import { routes } from '../../../helpers/routes'
import { useNavigate } from 'react-router-dom'
import { useUserStore }  from '../../../controllers/UserStore'
import { useDepartmentStore } from '../../../controllers/DepartmentStore'


const SignUp = () => {

  const submit = useUserStore((state)=>state.createUser)
  const department = useDepartmentStore((state)=>state.departmentData)

  const {register,handleSubmit} = useForm()
  const navigate = useNavigate()


  return (
    <div className='w-screen h-screen bg-slate-100 '>
      <div className='pt-16'>
        <form 
        onSubmit={handleSubmit(submit)}
        className='mx-auto w-fit p-5 sm:w-1/3 bg-[#DA8080] sm:p-8 rounded-xl grid sm:grid-cols-2 sm:gap-x-3'>
          <div className='flex gap-x-16 mb-5 col-span-2'>
            <img src='aamusteLogo.jpg' width='70px' height='40px'/>
            <h3 className='uppercase text-4xl text-center text-red-900 font-bold'>SignUP</h3>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Firstname</label>
            <input type='text' placeholder='firstname' {...register('firstname',{required:'Firstname is require'})}/>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Middlename</label>
            <input type='text' placeholder='middlename' {...register('middlename')}/>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Lastname</label>
            <input type='text' placeholder='lastname' {...register('lastname',{required:'lastname is require'})}/>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Email</label>
            <input type='email' placeholder='user@example.com' {...register('email',{required:'email is require'})}/>
          </div>

          <div className='flex flex-col my-3 gap-y-2'>
            <label>Gender</label>
           <select className='h-10 rounded-md' {...register('gender',{required:'gender is require'})}>
            <option >Select Gender</option>
            <option value='male'>Male</option>
            <option value='female'>Female</option>
           </select>
          </div>          
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Phone</label>
            <input type='tel' placeholder='lastname' {...register('phone',{required:'phone number is require'})}/>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Role</label>
           <select className='h-10 rounded-md' {...register('role')}>
            <option value='' >Select Role</option>
            <option value='hod'>H.O.D</option>
            <option value='estate'>Estate Manager</option>
           </select>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Department</label>
            <select className='h-10 rounded-md' {...register('department')}>
              {department?.map((dep)=>{
                return(
                  <option value={dep?.initials}>{dep?.name}</option>
                )
              })}
           </select>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Password</label>
            <input type='password'  {...register('confirmpassword')}/>
          </div>
          <div className='flex flex-col my-3 gap-y-2'>
            <label>Confirm Password</label>
            <input type='password'  {...register('password')}/>
          </div>
          <div className='flex col-span-2 gap-x-4 place-content-center mt-3'>
            <button >Sign UP</button>
            <button type='button' onClick={()=>navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
   </div>
  )
}

export default SignUp