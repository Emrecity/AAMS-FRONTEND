import React,{useEffect} from 'react'
import Modal from '../../components/Modal'
import {useForm} from 'react-hook-form'
import {useHodStore} from '../../controllers/HodStore'
import { useVenueStore } from '../../controllers/VenueStore'

const AddStaffModal = ({closeModal}) => {
    const{ register,handleSubmit,watch,reset} = useForm()
    const OnSubmit = useHodStore((state)=>state.createStaff)
    const getAllVenue = useVenueStore((state)=>state.getAllVenue)
    const data1 = useVenueStore((state)=>state.venueData)
    const id = watch('office.0')
    let realData = data1.find((n)=>n._id===id)
   
    const submit =(data)=>{
        data.office[0] = realData?.name
        data.office = data.office.join('-')
        OnSubmit(data)
        reset()
        realData=''
        data=''
        
    }

    useEffect(()=>{
        getAllVenue()
        data1
    },[])

  return (
    <Modal closeModal={closeModal} modal_id='add_staff_modal'>
        <form 
        onSubmit={handleSubmit(submit)}
        className='bg-[#DA8080] sm:p-8 rounded-xl h-fit'>
            <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'>Staff Forms</h1>
            <div className='grid sm:grid-cols-2 sm:gap-x-3'>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Title</label>
                <select className='h-10 rounded-md' {...register('title')}>
                    <option value='Mr'>Mr</option>
                    <option value='Mrs'>Mrs</option>
                    <option value='Prof'>Prof</option>
                    <option value='Dr'>Dr</option>
                    <option value='Ing'>Ing</option>
                </select>
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Firstname</label>
                <input type='text' placeholder='firstname' {...register('firstname')}/>
            </div>

            <div className='flex flex-col gap-y-2 my-3'>
                <label>Lastname</label>
                <input type='text' placeholder='lastname' {...register('lastname')}/>
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Othername</label>
                <input type='text' placeholder='Othername' {...register('othername')}/>
            </div>

            <div className='flex flex-col gap-y-2 my-3'>
                <label>Gender</label>
                <select className='h-10 rounded-md' {...register('gender')}>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Phone</label>
                <input type='tel' placeholder='phone' {...register('phone')}/>
            </div>

            <div className='flex flex-col gap-y-2 my-3'>
                <label>Email</label>
                <input type='email' placeholder='user@user.com' {...register('email')}/>
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Office</label>
                <select className='h-10 rounded-md' {...register('office.0')}>
                    <option value=''>Select Venue</option>
                    {
                        data1?.map((n)=>{
                            return(
                                <option key={n._id} value={n._id}>{n.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            { id !='' && <div className='flex flex-col gap-y-2 my-3 col-span-2'>
                <label>Office Room</label>
                <select className='h-8 rounded-md' {...register('office.1')}>
                    <option value=''>Select Room</option>
                   {
                    realData?.rooms?.map((n)=>{
                        return <option key={n._id} value={`${n.position} ${n.name}`}>{n.name}</option>
                    })
                   }
                </select>
            </div>}
        </div>
        <div className='flex gap-x-5 place-content-center'>
                <button>Add</button>
                <button type='button' onClick={closeModal}>Cancel</button>
        </div>
        </form>
    </Modal>
  )
}

export default AddStaffModal