import React, { useEffect, useMemo, useState } from 'react'
import {usePrint} from '../../components/PrintButton'
import EditRequestModal from './EditRequestModal'
import {useModalActions} from '../../components/ModalActions'
import EditButton from '../../components/EditButton'
import DeleteButton from '../../components/DeleteButton'
import { useHodStore } from '../../controllers/HodStore'



const AllRequestForm = () => {
  const data = useHodStore.getState().requestData
  const getAllRequest = useHodStore(state=>state.getAllRequest)
  const handleDelete = useHodStore((state)=>state.deleteRequest)
  const isProcessing = useHodStore(state=>state.isProcessing)
  const [toggle,setToggle]= useState(false)


  useEffect(()=>{
    data,
    getAllRequest()
   },[toggle])
  
   const [datafilter,setFilter] = useState({
    key:'',
    status:''
   })

   const UserData = data?.filter((n)=>{

    if(datafilter.key=='' && datafilter.status!=''){
      return n.status.toLowerCase().includes(datafilter.status)
    }
    if(datafilter.key!='' && datafilter.status ==''){
      return n.name.toLowerCase().includes(datafilter.key)||n.description.toLowerCase().includes(datafilter.key)||n.status.toLowerCase().includes(datafilter.key)||n.message.toLowerCase().includes(datafilter.key)
    }
    if(datafilter.key!=null && datafilter.status!=null){
      return n.name.toLowerCase().includes(datafilter.key)||n.description.toLowerCase().includes(datafilter.key)||n.status.toLowerCase().includes(datafilter.status)||n.message.toLowerCase().includes(datafilter.key)
    }
      return n
   })


const [requestdata,setRequestData] = useState({
  id:'',
  name:'',
  description:'',
  quantity:''
})
   
  const {printPage:HandlePrint} = usePrint('myform')
  const {open:OpenModal,close:CloseModal} = useModalActions('edit_request_modal')
  let number = 0

  return (
    <>
    <form className='flex flex-col sm:flex-row gap-y-2 sm:justify-between sm:mb-10 mb-5' >
    <div className='w-full sm:w-1/3 border border-red-400 rounded'>
      <input type='search' placeholder='search' className='w-full'value={datafilter.key} onChange={(e)=>{setFilter({...datafilter,key:e.target.value}) 
         }}/>
    </div>
    <div className='border border-red-400 place-content-center p-3 rounded'>
      <select value={datafilter.status} onChange={(e)=>{setFilter({...datafilter,status:e.target.value}) 
         }}>
        <option value=''> Show All</option>
        <option value='accept'> Accepted</option>
        <option value='pending'>Pending</option>
        <option value='reject'>Rejected</option>
      </select>
    </div>
    </form>
      <table id='myform'>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          { !isProcessing ?
            UserData?.map((dat)=>{
              number = number+1
              return(
                <tr key={dat?._id}>
                   <td>{number}</td>
                  <td>{dat?.name}</td>
                  <td>{dat?.description}</td>
                  <td>{dat?.quantity}</td>
                  <td>{dat?.status}</td>
                  <td>{dat?.message}</td> 
                 <td className='flex gap-x-8 border-none pt-3'>
                    {dat.status =='pending'? <><EditButton handleClick={()=>{
                     setRequestData({
                      id:dat._id,
                      name: dat.name,
                      description: dat.description,
                      quantity: dat.quantity
                    })
                    OpenModal()
                    setToggle(!toggle)
            }} />
            <DeleteButton handleClick={()=>{
              setToggle(!toggle)
              handleDelete(dat?._id)}}/> </>:'Disable'}
          </td>
                </tr>
              )
            })
          : 'processing'}
        </tbody>
      </table>
     
        <EditRequestModal closeModal={CloseModal}
        id={requestdata.id}
        name={requestdata.name}
        description={requestdata.description}
        quantity={requestdata.quantity}
        />
    <button onClick={HandlePrint} className='text-white shadow-md my-5 float-right px-5 rounded-md'>Print</button>

    </>
  )
}

export default AllRequestForm