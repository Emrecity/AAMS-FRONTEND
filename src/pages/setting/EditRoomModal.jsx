import React from 'react'
import Modal from '../../components/Modal'
import { useForm } from 'react-hook-form'
import { useVenueStore } from '../../controllers/VenueStore'

const EditRoomModal = ({CloseModal,id,name,position}) => {

    const{register,handleSubmit} = useForm()
    const submit = useVenueStore((state)=>state.updateRoom)

    const onsubmit=(data)=>{
        data.name = data.name !=''? data.name : name
        data.position = data.position!=''? data.position : position
        submit(id,data)
        data = ''
        id=''
        CloseModal()
    }

  return (
    <Modal closeModal={CloseModal} modal_id='edit_room_modal'>
        <form 
             onSubmit={handleSubmit(onsubmit)}
            className='bg-[#DA8080] sm:p-8 rounded-xl h-fit'>
                <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'>Edit Room</h1>
                <div className='flex flex-col gap-y-2 my-3'>
                    <label>Name</label>
                    <input type='text' placeholder='name' defaultValue={name} {...register('name')} />
                </div>
                <div className='flex flex-col gap-y-2 my-3'>
                    <label>Position</label>
                    <select {...register('position')} className='h-10 rounded-md'>
                        <option selected value={position}>{position}</option>
                        <option value='GF'>Ground Floor</option>
                        <option value='FF'>First Floor</option>
                        <option value='2F'>Second Floor</option>
                        <option value='3F'>Third Floor</option>
                        <option value='4F'>Fourth Floor</option>
                        <option value='5F'>Fifth Floor</option>
                        <option value='6F'>Sixth Floor</option>
                    </select>
                </div>
                <button className='font-bold text-xl py-2 mx-auto w-full my-2'>update</button>
                <button type='button' onClick={CloseModal}>Cancel</button>
            </form>
           
    </Modal>
  )
}

export default EditRoomModal