import React,{useEffect,useState} from 'react'
import { useForm } from 'react-hook-form'
import { useHodStore } from '../../controllers/HodStore'

const AuditForm = () => {
    const {register,handleSubmit,watch,reset,formState:{errors,isDirty}} = useForm()
    const submit = useHodStore((state)=>state.createAudit)
    const data = useHodStore((state)=>state.requestData)
    const StaffData = useHodStore((state)=>state.staffData)
    const department = localStorage.getItem('department')

    const name = watch('user')
    const requestId = watch('nameAndDescription')
    const id = name||''

    const request =  data?.filter((n)=>{
        return n.status == 'accept'
    })

    let requestData = data.find((n)=>n._id==requestId)

    let data2 = StaffData.find((n)=>n.email.includes(id))

    const onsubmit =(data)=>{
        data.user = `${data2.title} ${data2.firstname} ${data2.lastname} ${data2.othername}`
        data.location = data2.office
        data.nameAndDescription = `${requestData.name} ${requestData.description}`
        data.quantity = requestData.quantity
        submit(data)
        requestData=''
        data2 = ''
        reset()
    }

  return (
    <div>
    <form 
    onSubmit={handleSubmit(onsubmit)}
    className='bg-red-400 w-full sm:w-fit p-5 mt-5 mx-auto text-white'>
        <h1 className='text-center text-[#5B0101] text-2xl font-bold uppercase'>Audit Form</h1>
        <div className='grid grid-cols-2 gap-3'>
            <div className='flex flex-col gap-x-2'>
                <label>Date Of Purchase</label>
                <input type='date' className='text-[#5B0101]' {...register('dateOfPurchase',{required:'enter date of purchase'})}/>
                <small>{errors?.dateOfPurchase?.message}</small>
            </div>
            <div className='flex flex-col gap-x-2'>
            <label>Name and Description of Asset</label>
           <select className='text-black h-10 rounded-md' {...register('nameAndDescription')}>
            <option value=' '>select name</option>
            {
                request.map((n)=>{
                    return <option  value={n._id}>{n.name}{' '}{n.description} </option>
                })
            }
           </select>
        </div>
        </div>
       
        { requestId!=' '  &&
            <div className='flex flex-col gap-x-2'>
                <label>Quantity</label>
                <input type='number' className='text-black' value={requestData?.quantity}{...register('quantity')}/>
            </div>
            }
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
            <select {...register('user',{required:'select user'})}  className='text-black h-10 rounded-md' >
                <option value=''>Select User</option>
                {
                    StaffData.map((n)=>{
                        return <option key={n._id} value={n.email}>{n.title}{' '}{n.firstname}{' '}{n.lastname}{' '}{n.othername}</option>
                    })
                }
            </select>
        </div>
        <input type='text' value={department} className='hidden' {...register('department')}/>
       { name!='' && <div className='flex flex-col gap-x-2'>
            <label>Location</label>
            <input type='text' className='text-[#5B0101]'  value={data2?.office} {...register('location')}/>
        </div>
        }
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