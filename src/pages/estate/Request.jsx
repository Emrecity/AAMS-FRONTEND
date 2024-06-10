import React, { useEffect,useState } from 'react'
import { useEstateStore } from '../../controllers/EstateStore'
import { useDepartmentStore } from '../../controllers/DepartmentStore'
import {usePrint} from '../../components/PrintButton'
import Swal from 'sweetalert2'

const Request = ({ close }) => {
  const {printPage:handlePrint} = usePrint('requestTable')
  const getAllUser = useEstateStore((state)=>state.getAllData)
  const data = useEstateStore((state)=>state.allData)
  const isProcessing = useEstateStore((state)=>state.isProcessing)
  const submit = useEstateStore((state)=>state.updateRequest)
  const department = useDepartmentStore((state)=>state.departmentData)
  const getAllDepartment = useDepartmentStore((state)=>state.getAllDepartment)
  const [toggle,setToggle] = useState(false)
  useEffect(()=>{
    getAllUser();
    getAllDepartment()
    data
    department
  },[toggle])
  const [datafilter,setFilter] = useState('')
  const RequestData = data?.map((list)=>list.filter((n)=>{
    if(datafilter){
      return n.department === datafilter
    }
    return n.status ==='pending'
  
  }))
  const handleResponse = async(id,data1)=>{
    if(data1 === 'accept'&& id){
      let data ={status:'accept'}
      submit(id,data)
      setToggle(!toggle)
    }
    
    if(data1==='reject'&& id){
      const {value:text} = await Swal.fire({
        title:'Input message',
        input:'text',
        inputLabel:'Message',
        inputPlaceholder:'Enter your message',
        showCancelButton:true
      })
      if(text){
        let data = {status:'reject',message:text}
        submit(id,data)
        setToggle(!toggle)
      }
    }
    
  }


  let number=0
  return (
    <div className="bg-gray-200 py-5 px-10">
      <div className='flex justify-between mb-5'>
        <h1 className="text-[#5B0101] text-xl font-bold">All Requests</h1>
       
        <select 
        value={datafilter} onChange={(e)=>{setFilter(e.target.value) 
          }}
        className='bg-[#5B0101] text-white  sm:h-10 px-3 rounded-md mb-3'>
        <option value=''>All Department</option>
        {department?.map((dep)=>{
                return(
                  <option value={dep?.initials}>{dep?.name}</option>
                )
              })}
        </select>

      </div>
          <table id='requestTable'>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name of Asset</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Department</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              {
                 !isProcessing?
                 RequestData.map((list)=>{
                    return list.map((item)=>{
                      
                      if(item.status == 'pending'){
                        number = number+1
                      return(
                        <tr key={item._id}>
                          <td>{number}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.department}</td>
                        <td className='flex gap-x-3 border-none'>
                          <button
                          onClick={()=>{
                            let data = 'accept'
                            let id = item._id
                            handleResponse(id,data)
                           
                          }}
                          >Accept</button>
                          <button
                           onClick={()=>{
                            let data = 'reject'
                            let id = item._id
                            handleResponse(id,data)
                            
                          }}
                          >X</button>
                        </td>
                        </tr>
                      )}
                    })
                  })
              :'loading'}
              {/* {
                RequestData.map((item)=>{
                  number = number+1
                  return(
                    <tr>
                        <td>{number}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.quantity}</td>
                        <td>{item.department}</td>
                    </tr>
                  )
                })
              } */}
            </tbody>
          </table>
          <button onClick={handlePrint} className='my-5 float-right'>Print</button>
      <div className="btn-back" style={{margin:"10px"}}>
        <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={close}>Back</button>
      </div>    
    </div>
  )
}

export default Request