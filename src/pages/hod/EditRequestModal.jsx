import React, {useState} from 'react'
import Modal from '../../components/Modal'
import {useForm} from 'react-hook-form'
import { useHodStore } from '../../controllers/HodStore'


const EditRequestModal = ({closeModal,id,name,description,quantity}) => {

const {register,handleSubmit,formState:{isDirty,isValid}}= useForm()
const submit = useHodStore((state)=>state.updateRequest)

  const onsubmit =(data)=>{
   console.log(data)
   submit(id,data)
  }

  return (
    <Modal close={closeModal} modal_id='edit_request_modal'>
    <div className='bg-white w-full sm:min-w-fit p-5'>
       <form 
       onSubmit={handleSubmit(onsubmit)}
          className='bg-[#DA8080] px-5 text-left'>
        <h1 className='uppercase text-2xl text-[#5B0101] underline mb-4 font-bold text-center pt-4'>Edit Request</h1>
        <div className='flex flex-col gap-y-2'>
          <label for='asset'>Name of Asset</label>
          <input type='text' placeholder='asset' id='asset' defaultValue={name} {...register('name',{required:'enter name'})}/>
    
        </div>
        <div className='flex flex-col gap-y-2 my-2'>
          <label for='description'>Description</label>
          <input type='text' placeholder='description' id='description' defaultValue={description} {...register('description',{required:'enter description'})}/>
        </div>
        <div className='flex flex-col gap-y-2'>
          <label for='quantity'>Quantity</label>
          <input type='number' min={1} placeholder='asset' id='quantity' defaultValue={quantity} {...register('quantity',{valueAsNumber:true,required:'enter quantity'})}/>
        </div>
        <div className='flex gap-5 place-content-center mt-4 pb-3'>
        <button disabled={!isDirty || !isValid}>Update</button>
        <button type='button' onClick={closeModal}>Cancel</button>
        </div>
       </form>
      </div>
  </Modal>
  )
}

export default EditRequestModal