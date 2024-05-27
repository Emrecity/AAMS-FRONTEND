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
  
const [requestdata,setRequestData] = useState({
  id:'',
  name:'',
  description:'',
  quantity:''
})
   
  const {printPage:HandlePrint} = usePrint('myform')
  const {open:OpenModal,close:CloseModal} = useModalActions('edit_request_modal')

  return (
    <>
    <form className='flex flex-col sm:flex-row gap-y-2 sm:justify-between sm:mb-10 mb-5' >
    <div className='w-full sm:w-1/3 border border-red-400 rounded'>
      <input type='search' placeholder='search' className='w-full'/>
    </div>
    <div className='border border-red-400 place-content-center p-3 rounded'>
      Show{' '}
      <select>
        <option>10</option>
        <option>25</option>
        <option>50</option>
        <option>75</option>
        <option>100</option>
      </select>
    </div>
    </form>
      <table id='myform'>
        <thead>
          <tr>
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
            data?.map((dat)=>{
              return(
                <tr key={dat?._id}>
                  <td>{dat?.name}</td>
                  <td>{dat?.description}</td>
                  <td>{dat?.quantity}</td>
                  <td>{dat?.status}</td>
                  <td>{dat?.message}</td>
                  <td className='flex gap-x-8'>
            <EditButton  handleClick={()=>{
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
              handleDelete(dat?._id)}}/>
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