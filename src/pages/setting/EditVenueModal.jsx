import React from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { useVenueStore } from '../../controllers/VenueStore'

const EditVenueModal = ({CloseModal,id,name,initials}) => {

    const {register,handleSubmit,reset} = useForm()
    const submit = useVenueStore((state)=>state.updateVenue)

    const onsubmit=(data)=>{
        data.name = data.name !='' ? data.name : name
        data.initials = data.initials !='' ? data.initials : initials
        submit(id,data)
        data=''
        id=''
        reset()
        CloseModal()
    }

  return (
    <Modal closeModal={CloseModal} modal_id='edit_venue_modal'>
<form 
            onSubmit={handleSubmit(onsubmit)}
            className='bg-[#DA8080] sm:p-8 rounded-xl h-fit'>
                <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'>Edit Venue forms</h1>
                <div className='flex flex-col gap-y-2 my-3'>
                    <label>Name</label>
                    <input type='text' placeholder='name' defaultValue={name} {...register('name')} />
                </div>
                <div className='flex flex-col gap-y-2 my-3'>
                    <label>Initials</label>
                    <input type='text' placeholder='initials' defaultValue={initials} {...register('initials')}/>
                </div>
                <button className='font-bold text-xl py-2 mx-auto w-full my-2'>Update</button>
                <button type='button' onClick={CloseModal}>Cancel</button>
            </form>
      
</Modal>
  )
}

export default EditVenueModal