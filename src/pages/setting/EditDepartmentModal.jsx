import React from 'react'
import Modal from '../../components/Modal'
import {useForm} from 'react-hook-form'
import { useDepartmentStore } from '../../controllers/DepartmentStore'

const EditDepartmentModal = ({closeModal,id,name,initials}) => {

  const {register,handleSubmit,formState:{isDirty,isValid}}= useForm()
  const submit = useDepartmentStore((state)=>state.updateDepartment)
  const OnSubmit = (data)=>{
    submit(id,data)
    closeModal()
  }

  return (
    <Modal close={closeModal} modal_id='edit_department_modal'>
         <form
      onSubmit={handleSubmit(OnSubmit)}
      className='bg-[#DA8080] sm:p-8 rounded-xl h-fit'>
        <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'> Edit Department Forms</h1>
        <div className='flex flex-col gap-y-2 my-3'>
          <label>Name</label>
          <input type='text' autoFocus placeholder='department name' defaultValue={name} {...register('name',{isDirty:true,required:'name is required'})}/>
        </div>
        <div className='flex flex-col gap-y-2 my-3'>
          <label>Initial</label>
          <input type='text' placeholder='department initials' defaultValue={initials}{...register('initials',{isDirty:true,required:'initials is required'})}/>
        </div>
        <div className='flex gap-x-5 place-content-center'>
        <button className='font-bold text-xl py-2  w-fit mt-2' disabled={!isValid||!isDirty}>Update</button>
        <button type='button' onClick={closeModal} className='font-bold text-xl py-2  w-fit mt-2'>Cancel</button>
        </div>
      </form>
    </Modal>
  )
}

export default EditDepartmentModal