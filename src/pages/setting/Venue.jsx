import React,{useEffect,useState} from 'react'
import {useVenueStore} from '../../controllers/VenueStore'
import {useForm} from 'react-hook-form'
import EditButton from '../../components/EditButton'
import DeleteButton from '../../components/DeleteButton'
import {useModalActions} from '../../components/ModalActions'
import AddRoomModal from './AddRoomModal'

const Venue = () => {

    const {register,handleSubmit,reset,formState:{isDirty}} = useForm()
    const getAllVenue = useVenueStore((state)=>state.getAllVenue)
    const submit = useVenueStore((state)=>state.createVenue)
    const handleDelete = useVenueStore((state)=>state.deleteVenue)
    const data = useVenueStore((state)=>state.venueData)
    const handleRoomDelete = useVenueStore((state)=>state.deleteRoom)
    const {open:OpenAddRoomModal,close:CloseAddRoomModal} = useModalActions('add_room_modal')

    useEffect(()=>{
        getAllVenue()
        data
    })

    const [toggle,setToggle] = useState(true)
    const [singleData,setSingleData] = useState()
    const [dfil,setDfil] = useState('')

    const onsubmit=(data)=>{
        submit(data)
        reset()
    }

    const roomData = (singleData != ''? data?.find((n)=>n._id ===singleData?._id):[])

    const venueData = data.filter((n)=>{
        if(dfil != ''){
            return n.name.toLowerCase().includes(dfil.toLowerCase())||n.initials.toLowerCase().includes(dfil.toLowerCase())
        }
        return n
    })

  return (
    <div>
        <h1 className='text-3xl uppercase text-red-700'>Venue Page</h1><hr className='h-1 bg-red-900 mb-5 mt-2'/>
      {toggle? <> 
        <input type='search' placeholder='search keyword' value={dfil} onChange={(e)=>setDfil(e.target.value)} className='my-5 sm:w-72'/>
      <div className='flex gap-x-5'>
            <table className='table-fixed'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Initials</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        venueData?.map((n)=>{
                            return <tr key={n._id}>
                                <td>{n.name}</td>
                                <td>{n.initials}</td>
                                <td><EditButton/>
                                <DeleteButton handleClick={()=>{
                                    handleDelete(n._id)
                                }}/>
                                <button onClick={()=>{
                                    setSingleData(n)
                                    setToggle(!toggle)}} className='bg-green-300 h-10'>View</button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
            <form 
            onSubmit={handleSubmit(onsubmit)}
            className='bg-[#DA8080] sm:p-8 rounded-xl h-fit'>
                <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'>Venue Forms</h1>
                <div className='flex flex-col gap-y-2 my-3'>
                    <label>Name</label>
                    <input type='text' placeholder='name'{...register('name',{required:'Unique name is required'})} />
                </div>
                <div className='flex flex-col gap-y-2 my-3'>
                    <label>Initials</label>
                    <input type='text' placeholder='initials'{...register('initials',{required:'enter unique initials'})}/>
                </div>
                <button className='font-bold text-xl py-2 mx-auto w-full mt-2'>Add</button>
            </form>
        </div></>:
        <div>
            <div className='flex flex-col sm:flex-row sm:gap-x-5 text-2xl font-bold'>
                <label className=' text-red-700'>Venue Name:</label>
                <h2>{singleData.name}</h2>
            </div>
            <div className='flex flex-col sm:flex-row sm:gap-x-3 text-2xl font-bold'>
                <label className=' text-red-700'>Venue Initials:</label>
                <h2>{singleData.initials}</h2>
            </div>
            <div className='flex gap-2 sm:justify-between my-5'>
                <h1 className='uppercase text-xl text-red-700'>Rooms</h1>
                <button onClick={()=>OpenAddRoomModal()}>Add Room</button>
            </div>
            <table className='table-fixed mb-3'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                {/* {
                rooms?.map((n)=>{     
                        return <tr key={n._id} >
                        <td>{n?.name}</td>
                        <td className='text-nowrap'>{n?.position}</td>
                        <td className='flex mt-3 border-none gap-x-3 place-content-center'>
                            <EditButton/>
                            <DeleteButton/>
                        </td>
                        </tr>     
                })
               } */}
               {
                roomData?.rooms.map((n)=>{
                    return(
                        <tr key={n._id}>
                         <td>{n?.name}</td>
                         <td className='text-nowrap'>{n?.position}</td>
                         <td className='flex mt-3 border-none gap-x-3 place-content-center'>
                            <EditButton/>
                            <DeleteButton handleClick={()=>handleRoomDelete(n._id)}/>
                         </td>
                        </tr>
                    )
                })
               }
                </tbody>
            </table>
          <AddRoomModal CloseModal={CloseAddRoomModal} id={singleData._id}/>
            <button onClick={()=>{
                setToggle(!toggle)
                setSingleData('')
                }}>Back</button>
        </div>
        }
    </div>
  )
}

export default Venue