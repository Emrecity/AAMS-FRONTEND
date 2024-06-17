import React from 'react'
import { useForm } from 'react-hook-form'
import Modal from '../../components/Modal'
import { useHodStore } from '../../controllers/HodStore'

const EditAuditModal = ({close,id,date,quantity,name,finance,idNumber,user,location,remarks}) => {
    
    const {register,handleSubmit,watch,formState:{isDirty}} = useForm()
    const submit = useHodStore((state)=>state.updateAudit)
    const data = useHodStore((state)=>state.requestData)
    const StaffData = useHodStore((state)=>state.staffData)
    
    const request = data.filter((n)=>n.status === 'accept')
    const fname = watch('user')
    const requestId = watch('nameAndDescription')
    const nid = fname||''


    let data2 = StaffData.find((n)=>n.email.includes(nid))
    let requestData = data.find((n)=>n._id==requestId)

const onsumbit=(data)=>{
    data.dateOfPurchase = (data.dateOfPurchase!='')? data.dateOfPurchase:date
    data.quantity = (data.quantity=='')? quantity : data.quantity
    data.nameAndDescription = (data.nameAndDescription !='')? `${requestData.name} ${requestData.description}`:name
    data.location = (data.user!='')? data2?.office : location
    data.identificationId = (data.identificationId !='')? data.identificationId:idNumber
    data.user = (data.user !='')? `${data2.title} ${data2.firstname} ${data2.lastname} ${data2.othername}`:user
    data.finance = (data.finance !='')? data.finance:finance
    data.remarks = (data.remarks !='')? data.remarks:remarks
    submit(id,data)
    requestData=''
    data2 = ''
    close()
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
                    <input type='date' className='text-[#5B0101]' defaultValue={date} {...register('dateOfPurchase')}/>
                </div>
                <div className='flex flex-col gap-x-2'>
                    <label>Name and Description</label>
                    <select className='text-black h-10 rounded-md' {...register('nameAndDescription')}>
                     <option selected value={''}>{name}</option>
                         {
                          request?.map((n)=>{
                          return <option  value={n._id}>{n.name}{' '}{n.description} </option>
                               })
                         }   
                     </select>
                </div>
               
            </div>
            <div className='flex flex-col gap-x-2'>
                    <label>Quantity</label>
                    <input type='number'  className='text-black' defaultValue={quantity} {...register('quantity')}/>
                </div>
            <div className='flex flex-col gap-x-2'>
                <label>Sources of finance</label>
                <input type='text' className='text-[#5B0101]' defaultValue={finance} {...register('finance')}/>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>Identification Number</label>
                <input type='text' className='text-[#5B0101]' defaultValue={idNumber} {...register('identificationId')}/>
            </div>
            <div className='flex flex-col gap-x-2'>
                <label>User</label>
                <select {...register('user')} className='text-black h-10 rounded-md' >
                {/* <option value=' '>{user}</option> */}
                <option  value=''>{user}</option>
                {
                    StaffData.map((n)=>{
                        return <option key={n._id} value={n.email}>{n.title}{' '}{n.firstname}{' '}{n.lastname}{' '}{n.othername}</option>
                    })
                }
            </select>
            </div>
              
         { fname!=''&&  <div className='flex flex-col gap-x-2 hidden'>
            <label>Location</label>
            <input type='text' className='text-black' value={(fname == '')?location:data2?.office} {...register('location')}/>
            </div>}
             
       
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