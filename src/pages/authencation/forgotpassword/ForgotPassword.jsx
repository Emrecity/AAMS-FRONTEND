import React from 'react'
import { useForm } from 'react-hook-form'
import { routes } from '../../../helpers/routes'
import { useNavigate } from 'react-router-dom'

const ForgotPassword = () => {

  const {register,handleSubmit} = useForm()
  const navigate = useNavigate()

  return (
    <div className='w-screen h-screen bg-slate-100'>
    <div  className='pt-36'>
      <form
      onSubmit={handleSubmit()}
      className='mx-auto w-fit p-5 sm:w-1/3 bg-[#DA8080] sm:p-8 rounded-xl'>
        <div className='flex gap-x-8 mb-5'>
          <img src='aamusteLogo.jpg' width='60px' height='40px'/>
          <h3 className='uppercase text-3xl text-center text-red-900 font-bold'>Forgot Password</h3>
        </div>
        <div className='flex flex-col my-5 gap-y-2'>
          <label for='email'>Email</label>
          <input type='email' id='email' placeholder='example@gmail.com' {...register('email',{
            required:'email is require'
          })}/>
        </div>
        <button onClick={()=>navigate(routes.RESET_PASSWORD)} className='font-bold text-xl py-2 mx-auto w-full'>Submit</button>
      </form>
    </div>
</div>
  )
}

export default ForgotPassword