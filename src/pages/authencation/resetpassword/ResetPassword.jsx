import React from 'react'
import { useForm } from 'react-hook-form'
import { routes } from '../../../helpers/routes'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../../controllers/UserStore'

const ResetPassword = () => {
  const submit = useUserStore((state)=>state.resetPassword)
  const {register,handleSubmit} = useForm()
  const navigate = useNavigate()

// const submit = (data)=>{
//   console.log(data)
// }

  return (
    <div className='w-screen h-screen bg-slate-100'>
        <div  className='pt-32'>
          <form
          onSubmit={handleSubmit(submit)}
          className='mx-auto w-fit p-5 sm:w-1/3 bg-[#DA8080] sm:p-8 rounded-xl'>
            <div className='flex gap-x-8 mb-5'>
              <img src='aamusteLogo.jpg' width='60px' height='40px'/>
              <h3 className='uppercase text-3xl text-center text-red-900 font-bold'>reset password</h3>
            </div>
       
            <div className='flex flex-col my-3 gap-y-2'>
              <label for='password'>Password</label>
              <input type='password' id='password' {...register('password',{
                required:'password is require'
              })} />
            </div>

            <div className='flex flex-col my-8 gap-y-2'>
              <label for='cpassword'>Confirm Password</label>
              <input type='password' id='cpassword' {...register('confirmpassword',{
                required:'password is require'
              })} />
            </div>
     
            <button className='font-bold text-xl py-2 mx-auto w-full'>Reset Password</button>
          </form>
        </div>
    </div>
  )
}

export default ResetPassword