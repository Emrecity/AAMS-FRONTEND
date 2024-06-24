import React,{useEffect,useState} from 'react'
import {useVenueStore} from '../../controllers/VenueStore'
import {useForm} from 'react-hook-form'
import EditButton from '../../components/EditButton'
import DeleteButton from '../../components/DeleteButton'
import {useModalActions} from '../../components/ModalActions'
import AddRoomModal from './AddRoomModal'
import EditRoomModal from './EditRoomModal'
import EditVenueModal from './EditVenueModal'
import DataTable from 'react-data-table-component'

const Venue = () => {

    const {register,handleSubmit,reset,formState:{isDirty}} = useForm()
    const getAllVenue = useVenueStore((state)=>state.getAllVenue)
    const submit = useVenueStore((state)=>state.createVenue)
    const handleDelete = useVenueStore((state)=>state.deleteVenue)
    const data = useVenueStore((state)=>state.venueData)
    const handleRoomDelete = useVenueStore((state)=>state.deleteRoom)
    const {open:OpenAddRoomModal,close:CloseAddRoomModal} = useModalActions('add_room_modal')
    const {open:OpenEditRoomModal,close:CloseEditRoomModal} = useModalActions('edit_room_modal')
    const {open:OpenEditVenueModal,close:CloseEditVenueModal} = useModalActions('edit_venue_modal')

    useEffect(()=>{
        getAllVenue()
        data
    })

    const [toggle,setToggle] = useState(true)
    const [singleData,setSingleData] = useState()
    const [dfil,setDfil] = useState('')
    const [upRoomData, setUpRoomData] = useState({
        id:'',
        position:'',
        name:''
    })
    const [upVenueData, setUpVenueData] = useState({
        id:'',
        initials:'',
        name:''
    })

    const onsubmit=(data)=>{
        submit(data)
        reset()
    }

    const customStyle ={
        headCells:{
          style:{
            fontWeight: "bold",
            paddingLeft:"10px",
            fontSize:'18px',
            marginButton:"3px",
            borderColor:'red',
          }
        },
        rows:{
          style:{
            borderStyle:'solid',
            borderWidth:'medium',
            borderTopColor:'#DA8080',
            textAlign:'left'
          }
        }
    
      }

    const roomData = (singleData != ''? data?.find((n)=>n._id ===singleData?._id):[])

    const venueData = data.filter((n)=>{
        if(dfil != ''){
            return n.name.toLowerCase().includes(dfil.toLowerCase())||n.initials.toLowerCase().includes(dfil.toLowerCase())
        }
        return n
    })

    const Columns = [
     
        {
            name:"Name",
            selector:row=>row?.name,
            sortable:true
        },
        {
            name:"Initials",
            selector:row=>row?.initials,
            sortable:true
        },
        {
            name:"Action",
            button:true,
            cell:(row)=>{return(<>
            <EditButton
                handleClick={()=>{
                 setUpVenueData({
                    id:row._id,
                    name:row.name,
                    initials:row.initials
                })
                    OpenEditVenueModal()
                }}
            />
            <DeleteButton handleClick={()=>{
                handleDelete(row._id)
            }}/>
            <button onClick={()=>{
                setSingleData(row)
                setToggle(!toggle)}} className='bg-green-400 h-10 hover:bg-green-500'>V</button>
            </>)}
        },
    ]
    const columns = [
        {
            name:"Name",
            selector:row=>row?.name,
            sortable:true
        },
        {
            name:"Position",
            selector:row=>row?.position,
            sortable:true
        },
        {
            name:"Action",
            button:true,
            cell:(row)=>{return(<>
             <EditButton handleClick={()=>{
              setUpRoomData({
                  id:row?._id,
                  name:row?.name,
                 position:row?.position
             })
            OpenEditRoomModal()}}/>
            <DeleteButton handleClick={()=>{
                handleRoomDelete(row._id)
            }}/>

            </>)}
        },
    ]

  return (
    <div>
        <h1 className='text-3xl uppercase text-red-700'>Venue Page</h1><hr className='h-1 bg-red-900 mb-5 mt-2'/>
      {toggle? <> 
        <input type='search' placeholder='search keyword' value={dfil} onChange={(e)=>setDfil(e.target.value)} className='my-5 sm:w-72'/>
      <div className='flex gap-x-5'>
           <div className='w-full'>
            <DataTable customStyles={customStyle} columns={Columns} data={venueData} pagination/>
            </div>
            <EditVenueModal
             CloseModal={CloseEditVenueModal}
             id={upVenueData?.id}
             name={upVenueData?.name}
             initials={upVenueData?.initials}
             />
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
            <DataTable customStyles={customStyle} columns={columns} data={roomData?.rooms} pagination/>
          <AddRoomModal CloseModal={CloseAddRoomModal} id={singleData._id}/>
          <EditRoomModal 
          CloseModal={CloseEditRoomModal}
          id={upRoomData?.id}
          name={upRoomData?.name}
          position={upRoomData?.position}
          />
            <button onClick={()=>{
                setToggle(!toggle)
                setSingleData('')
                }} className='mt-5 float-right'>Back</button>
        </div>
        }
    </div>
  )
}

export default Venue