import React from 'react'
import { useForm } from 'react-hook-form'
import { useHodStore } from '../../controllers/HodStore'

const AuditForm = () => {
    const {register,handleSubmit,formState:{errors,isDirty}} = useForm()
    const submit = useHodStore((state)=>state.createAudit)
  return (
    <div>
    <form 
    onSubmit={handleSubmit(submit)}
    className='bg-red-400 w-full sm:w-fit p-5 mt-5 mx-auto text-white'>
        <h1 className='text-center text-[#5B0101] text-2xl font-bold uppercase'>Audit Form</h1>
        <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-x-2'>
                <label>Date Of Purchase</label>
                <input type='date' className='text-[#5B0101]' {...register('dateOfPurchase',{required:'enter date of purchase'})}/>
                <small>{errors?.dateOfPurchase?.message}</small>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>Quantity</label>
                <input type='number' min={1} className='text-[#5B0101]'{...register('quantity',{required:'Enter the quantity',
                valueAsNumber: true
                })}/>
            </div>
        </div>
        <div className='flex flex-col gap-x-2'>
            <label>Name and Description of Asset</label>
            <input type='text' className='text-[#5B0101]' {...register('nameAndDescription',{required:'enter name and descripton'})}/>
        </div>
        <div className='flex flex-col gap-x-2'>
            <label>Sources of finance</label>
            <input type='text' className='text-[#5B0101]' {...register('finance')}/>
        </div>
        <div className='flex flex-col gap-x-2'>
            <label>Identification Number</label>
            <input type='text' className='text-[#5B0101]'{...register('identificationId',{required:'enter identification number'})}/>
        </div>
        <div className='flex flex-col gap-x-2'>
            <label>User</label>
            <input type='text' className='text-[#5B0101]' {...register('user',{required:'enter user'})}/>
        </div>
        <div className='flex flex-col gap-x-2'>
            <label>Location</label>
            <input type='text' className='text-[#5B0101]' {...register('location',{required:'enter location'})}/>
        </div>
        <div className='flex flex-col gap-x-2'>
            <label>Remarks</label>
            <select className='text-[#5B0101] h-10 rounded' {...register('remarks',{required:'enter remarks'})}>
                    <option value='healthy'>Healthy</option>
                    <option value='under repair'>Under repair</option>
                    <option value='not functional'>Not functional</option>
                </select>
        </div>
        <div className='flex gap-3 place-content-end mt-4'>
            <button disabled={!isDirty}>Save</button>
            <button type='button'>Cancel</button>
        </div>
    </form>
</div>
  )
}

export default AuditForm