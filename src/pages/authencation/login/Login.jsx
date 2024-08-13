import React from 'react'
import { Link } from 'react-router-dom'
import { routes } from '../../../helpers/routes'
import { useForm } from 'react-hook-form'
import { useUserStore } from '../../../controllers/UserStore'

const Login = () => {
  const submit = useUserStore((state)=>state.login)
  const data = useUserStore((state) => state);
  const {register,handleSubmit,formState:{isDirty}} = useForm()


  return (
    <div className='w-screen h-screen bg-slate-100 text-white'>
        <div  className='pt-32'>
          <form
          onSubmit={handleSubmit(submit)}
          className='mx-auto w-fit p-5 sm:w-1/3 bg-[#DA8080] sm:p-8 rounded-xl'>
            <div className='flex gap-x-8 mb-5'>
              <img src='aamusteLogo.jpg' width='60px' height='40px'/>
              <h3 className='uppercase text-4xl text-center text-red-900 font-bold'>Login</h3>
            </div>
            <div className='flex flex-col my-3 gap-y-2'>
              <label for='email'>Email</label>
              <input type='email' id='email' placeholder='example@gmail.com' {...register('email',{
                required:'email is require'
              })}/>
            </div>
            <div className='flex flex-col my-3 gap-y-2'>
              <label for='password'>Password</label>
              <input type='password' id='password' {...register('password',{
                required:'password is require'
              })} />
            </div>
            <div className='flex justify-between text-center mb-5'>
          <div className='flex gap-x-1'>
            <input type='checkbox' className='h-7 w-5' id='check' />
            <label for='check'>Remember me</label>
          </div>
          <Link to={routes.FORGOT_PASSWORD} className='text-red-700'>Forgot password</Link>
        </div>
            <button disabled={!isDirty} className='font-bold text-xl py-2 mx-auto w-full'>{data.isProcessing ? 'Processing' : 'Login'}</button>
          </form>
        </div>
    </div>
  )
}

export default Login