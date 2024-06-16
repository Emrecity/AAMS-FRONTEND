import React from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import {useHodStore} from '../../controllers/HodStore'

const EditStaffModal = ({closeModal,id,title,firstname,lastname,othername,gender,phone,office,email}) => {

    const submit =useHodStore((state)=>state.updateStaff)
    const{register,handleSubmit,formState:{isDirty,isValid}}=useForm()

    const onsubmit=(data)=>{
        data.title = (data.title!='')? data.title:title
        data.firstname = (data.firstname!='')? data.firstname:firstname
        data.lastname = (data.lastname!='')? data.lastname:firstname
        data.othername = (data.othername!='')? data.othername:othername
        data.gender = (data.gender!='')? data.gender:gender
        data.email = (data.email!='')? data.email:email
        data.phone = (data.phone)? data.phone:phone
        data.office =(data.office[1] !='' && data.office[0]!='')? data.office.join('-'):office
        submit(id,data)
        closeModal()
    }

  return (
    <Modal closeModal={closeModal} modal_id='edit_staff_modal'>
        <form
        onSubmit={handleSubmit(onsubmit)}
        className='bg-[#DA8080] sm:p-8 rounded-xl h-fit'>
            <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'> Edit Staff</h1>
            <div className='grid sm:grid-cols-2 sm:gap-x-3'>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Title</label>
                <select className='h-10 rounded-md' defaultValue={title} {...register('title')}>
                    <option value=''>{title}</option>
                    <option value='Mr'>Mr</option>
                    <option value='Mrs'>Mrs</option>
                    <option value='Prof'>Prof</option>
                    <option value='Doc'>Dr</option>
                    <option value='Ing'>Ing</option>
                </select>
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Firstname</label>
                <input type='text' placeholder='firstname' defaultValue={firstname} {...register('firstname')}/>
            </div>

            <div className='flex flex-col gap-y-2 my-3'>
                <label>Lastname</label>
                <input type='text' placeholder='Lastname' defaultValue={lastname} {...register('lastname')} />
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Othername</label>
                <input type='text' placeholder='othername' defaultValue={othername} {...register('othername')} />
            </div>

            <div className='flex flex-col gap-y-2 my-3'>
                <label>Gender</label>
                <select className='h-10 rounded-md' defaultValue={gender} {...register('gender')}>
                    <option value=''>select gender</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Phone</label>
                <input type='tel' placeholder='phone' defaultValue={phone} {...register('phone')} />
            </div>

            <div className='flex flex-col gap-y-2 my-3'>
                <label>Email</label>
                <input type='email' placeholder='user@user.com' defaultValue={email} {...register('email')} />
            </div>
            <div className='flex flex-col gap-y-2 my-3'>
                <label>Office</label>
                <select className='h-10 rounded-md' {...register('office.0')}>
                    <option value=''>Select Building</option>
                    <option value='rob'>Rob</option>
                </select>
            </div>
            <div className='flex flex-col gap-y-2 my-3 col-span-2'>
                <label>Room</label>
                <select className='h-8 rounded-md'{...register('office.1')}>
                    <option value=''>Select Room</option>
                    <option value='room 1'>Room 1</option>
                    <option value='room 2'>Room 2</option>
                    <option value='room 3'>Room 3</option>
                </select>
            </div>
        </div>
        <div className='flex gap-x-5 place-content-center'>
                <button disabled={!isDirty&&!isValid}>Update</button>
                <button type='button' onClick={closeModal}>Cancel</button>
        </div>
      </form>
</Modal>
  )
}

export default EditStaffModal