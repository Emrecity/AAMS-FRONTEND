import React from 'react'
import Modal from '../../components/Modal'
import {useForm} from 'react-hook-form'
import { useDepartmentStore } from '../../controllers/DepartmentStore'
import { useEstateStore } from '../../controllers/EstateStore'

const EditAssetModal = ({closeModal,id,name,description,dateOfPurchase,quantity,identificationNumber,department1}) => {

    const {register,handleSubmit,formState:{isDirty,isValid,isSubmitting}} = useForm()
    const department = useDepartmentStore((state)=>state.departmentData)
    const submit = useEstateStore((state)=>state.updateAsset)

    const OnSubmit = (data)=>{
        submit(id,data)
        closeModal()
    }

  return (
    <Modal  close={closeModal} modal_id='edit_asset_modal'>
         <form 
        onSubmit={handleSubmit(OnSubmit)}
        className='p-5 bg-red-400 rounded-md sm:mt-5'>
            <h1 className='text-2xl font-bold uppercase text-center text-red-700'>Asset form</h1>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Name</label>
                <input type='text' autoComplete={name} placeholder='Enter name of asset' defaultValue={name} {...register('name',{isDirty:true,required:'name is required'})}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Description</label>
                <input type='text' autoComplete={description} placeholder='Enter name of asset' defaultValue={description} {...register('description',{isDirty:true,required:'name is required'})}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Date Of Purchase</label>
                <input type='date' autoComplete={dateOfPurchase} defaultValue={dateOfPurchase} {...register('dateOfPurchase',{isDirty:true,required:'name is required'})}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Quantity</label>
                <input type='number' autoComplete={quantity} min={1} defaultValue={quantity} {...register('quantity',{isDirty:true,valueAsNumber:true,required:'name is required'})}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Identification Number</label>
                <input type='text' autoComplete={identificationNumber} placeholder='Enter ID of asset' defaultValue={identificationNumber} {...register('identificationNumber',{isDirty:true,required:'name is required'})}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Department</label>
                <select  {...register('department',{isDirty:true})} autoFocus>
                    <option defaultChecked value={department1}>{department1}</option>
                {department?.map((dep)=>{
                return(
                  <option value={dep?.initials}>{dep?.name}</option>
                )
                 })}
                </select>
            </div>
            <div className='flex gap-x-3 mt-3 place-content-center'>
                <button disabled={!isDirty||!isValid}>{isSubmitting?'processing':'Update'}</button>
                <button type='button' onClick={closeModal}>Cancel</button>
            </div>
        </form>
    </Modal>
  )
}

export default EditAssetModal