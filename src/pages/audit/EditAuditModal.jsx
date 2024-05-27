import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../components/Modal'
import { useHodStore } from '../../controllers/HodStore'

const EditAuditModal = ({close,id,date,quantity,name,finance,idNumber,user,location,remarks}) => {
    
    const {register,handleSubmit,formState:{isDirty}} = useForm()
    const submit = useHodStore((state)=>state.updateAudit)

const onsumbit=(data)=>{
    submit(id,data)
    window.location.reload()
}

  return (
   <Modal closeModal={close} modal_id='edit_audit_modal'>
       <div>
        <form
            onSubmit={handleSubmit(onsumbit)}
        className='bg-red-400 w-full sm:w-fit p-5 mt-5 mx-auto text-left text-white'>
            <h1 className='text-[#5B0101] text-xl uppercase underline text-center mb-5'>Edit Audit</h1>
            <div className='grid grid-cols-2 gap-3'>
                <div className='flex flex-col gap-x-2'>
                    <label>Date Of Purchase</label>
                    <input type='date' className='text-[#5B0101]' defaultValue={date} {...register('dateOfPurchase',{required:'enter date of purchase'})}/>
                </div>
                <div className='flex flex-col gap-x-2'>
                    <label>Quantity</label>
                    <input type='number' min={1} className='text-[#5B0101]' defaultValue={quantity} {...register('quantity',{
                valueAsNumber: true,
                required:'enter quantity',
                min:1
                })}/>
                </div>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>Name and Description of Asset</label>
                <input type='text' className='text-[#5B0101]' defaultValue={name} {...register('nameAndDescription',{required:'enter name '})}/>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>Sources of finance</label>
                <input type='text' className='text-[#5B0101]' defaultValue={finance} {...register('finance',{required:'enter source of finance'})}/>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>Identification Number</label>
                <input type='text' className='text-[#5B0101]' defaultValue={idNumber} {...register('identificationId',{required:'enter identification number'})}/>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>User</label>
                <input type='text' className='text-[#5B0101]' defaultValue={user} {...register('user',{required:'enter user'})}/>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>Location</label>
                <input type='text' className='text-[#5B0101]' defaultValue={location} {...register('location',{required:'enter location'})}/>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>Remarks</label>
                <select className='text-[#5B0101] h-10 rounded' defaultValue={remarks} {...register('remarks')}>
                    <option value='healthy'>Healthy</option>
                    <option value='under repair'>Under repair</option>
                    <option value='not functional'>Not functional</option>
                </select>
            </div>
            <div className='flex gap-3 place-content-end mt-4'>
                <button disabled={!isDirty}>Update</button>
                <button type='button' onClick={close}>Cancel</button>
            </div>
        </form>
    </div>
   </Modal>
  )
}

export default EditAuditModal