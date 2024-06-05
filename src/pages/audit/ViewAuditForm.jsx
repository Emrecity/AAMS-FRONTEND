import React,{useEffect,useState} from 'react'
import EditAuditModal from './EditAuditModal'
import { useModalActions } from '../../components/ModalActions'
import DeleteButton from '../../components/DeleteButton'
import EditButton from '../../components/EditButton'
import { useHodStore } from '../../controllers/HodStore'

const ViewAuditForm = () => {
  const{open:OpenAuditModal,close:CloseAuditModal} = useModalActions('edit_audit_modal')
  const department =localStorage.getItem('department')
  const getAllAudit = useHodStore((state)=>state.getAllAudit)
  const isProcessing = useHodStore((state)=>state.isProcessing)
  const data = useHodStore(state=>state.auditData)
  const deleteHandler = useHodStore((state)=>state.deleteAudit) 
  const [toggle,setToggle] = useState(false)

  useEffect(()=>{
    getAllAudit()
    data
  },[toggle])

let number = 0

const [auditData,setAuditData] = useState('')

  return (
    <div className='px-5'>
        <div className='flex justify-between'>
        <input type='search' placeholder='keyword' className='outline outline-red-400 bg-transparent'/>
     
        <select disabled  className='bg-[#5B0101] text-white  sm:h-10 px-3 rounded-md mb-3'>
            <option>{department}</option>
        </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Date of Purchase</th>
                    <th>Name & Description</th>
                    <th>Quantity</th>
                    <th>Souce of Finance</th>
                    <th>Identification Number</th>
                    <th>User</th>
                    <th>Location</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {!isProcessing?
                    data?.map((dat)=>{
                       
                        number = number+1
                        return(
                        <tr key={dat?._id}>
                            <td>{number}</td>
                            <td>{dat?.dateOfPurchase}</td>
                            <td>{dat?.nameAndDescription}</td>
                            <td>{dat?.quantity}</td>
                            <td>{dat?.finance}</td>
                            <td>{dat?.identificationId}</td>
                            <td>{dat?.user}</td>
                            <td>{dat?.location}</td>
                            <td>{dat?.remarks}</td>
                            <td>
                                 <EditButton handleClick={()=>{
                                  setAuditData({
                                    id:dat?._id,
                                    date:dat?.dateOfPurchase,
                                    name:dat?.nameAndDescription,
                                    quantity:dat?.quantity,
                                    finance:dat?.finance,
                                    idNumber:dat?.identificationId,
                                    user:dat?.user,
                                    location:dat?.location,
                                    remarks:dat?.remarks
                                  })
                                  OpenAuditModal()
                                  setToggle(!toggle)
                                }}/>
                                  <DeleteButton handleClick={()=>{
                                    deleteHandler(dat._id)
                                    setToggle(!toggle)
                                    }}/>
                              </td>
                        </tr>)
                    }):'processing'
                }
                   
              
                <EditAuditModal close={CloseAuditModal}
                  id={auditData.id}
                  date={auditData.date}
                  name={auditData.name}
                  quantity={auditData.quantity}
                  finance={auditData.finance}
                  idNumber={auditData.idNumber}
                  user={auditData.user}
                  location={auditData.location}
                  remarks={auditData.remarks}
                />
            </tbody>
        </table>
    </div>
  )
}

export default ViewAuditForm