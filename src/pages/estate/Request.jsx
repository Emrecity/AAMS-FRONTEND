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
                          className='bg-transparent hover:bg-transparent'><svg fill="blue" width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                          <title>Accept</title>
                          <path d="M16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM23.258 12.307l-9.486 9.485c-0.238 0.237-0.623 0.237-0.861 0l-0.191-0.191-0.001 0.001-5.219-5.256c-0.238-0.238-0.238-0.624 0-0.862l1.294-1.293c0.238-0.238 0.624-0.238 0.862 0l3.689 3.716 7.756-7.756c0.238-0.238 0.624-0.238 0.862 0l1.294 1.294c0.239 0.237 0.239 0.623 0.001 0.862z"></path>
                          </svg></button>
                          <button
                           onClick={()=>{
                            let data = 'reject'
                            let id = item._id
                            handleResponse(id,data)
                            
                          }}
                          className='bg-transparent hover:bg-transparent'><svg width="40px" height="40px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="red"><path fill-rule="evenodd" clip-rule="evenodd" d="M8.6 1c1.6.1 3.1.9 4.2 2 1.3 1.4 2 3.1 2 5.1 0 1.6-.6 3.1-1.6 4.4-1 1.2-2.4 2.1-4 2.4-1.6.3-3.2.1-4.6-.7-1.4-.8-2.5-2-3.1-3.5C.9 9.2.8 7.5 1.3 6c.5-1.6 1.4-2.9 2.8-3.8C5.4 1.3 7 .9 8.6 1zm.5 12.9c1.3-.3 2.5-1 3.4-2.1.8-1.1 1.3-2.4 1.2-3.8 0-1.6-.6-3.2-1.7-4.3-1-1-2.2-1.6-3.6-1.7-1.3-.1-2.7.2-3.8 1-1.1.8-1.9 1.9-2.3 3.3-.4 1.3-.4 2.7.2 4 .6 1.3 1.5 2.3 2.7 3 1.2.7 2.6.9 3.9.6zM7.9 7.5L10.3 5l.7.7-2.4 2.5 2.4 2.5-.7.7-2.4-2.5-2.4 2.5-.7-.7 2.4-2.5-2.4-2.5.7-.7 2.4 2.5z"/></svg></button>
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