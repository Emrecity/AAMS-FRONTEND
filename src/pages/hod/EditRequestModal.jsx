import React, {useEffect, useState} from 'react'
import Modal from '../../components/Modal'
import {useForm} from 'react-hook-form'
import { useHodStore } from '../../controllers/HodStore'


const EditRequestModal = ({closeModal,id,name,description,quantity}) => {

  useEffect(()=>{
    reset()
  },[closeModal])

const {register,handleSubmit,reset,formState:{isDirty,isValid}}= useForm()
const submit = useHodStore((state)=>state.updateRequest)
 
  const onsubmit =(data)=>{
    data.name=(data.name) ? data.name:name
    data.description = (data.description)? data.description:description
    data.quantity = (data.quantity)? data.quantity:quantity
    submit(id,data)
    // reset()
    closeModal()
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
          <input type='text'   id='asset' defaultValue={name} {...register('name')}/>
    
        </div>
        <div className='flex flex-col gap-y-2 my-2'>
          <label for='description'>Description</label>
          <input type='text'   id='description' defaultValue={description} {...register('description')}/>
        </div>
        <div className='flex flex-col gap-y-2'>
          <label for='quantity'>Quantity</label>
          <input type='number' min={1}  id='quantity' defaultValue={quantity} {...register('quantity')}/>
        </div>
        <div className='flex gap-5 place-content-center mt-4 pb-3'>
        <button >Update</button>
        <button type='button' onClick={closeModal}>Cancel</button>
        </div>
       </form>
      </div>
  </Modal>
  )
}

export default EditRequestModal