import React, { useEffect,useState} from 'react'
import {usePrint} from '../../components/PrintButton'
import { useEstateStore } from '../../controllers/EstateStore'
import { useDepartmentStore } from '../../controllers/DepartmentStore'

const Audit = ({close}) => {
  const {printPage:handlePrint} = usePrint('auditForm')
  const getAllUser = useEstateStore((state)=>state. getAllAuditData)
  const data = useEstateStore((state)=>state.allAuditData)
  const isProcessing = useEstateStore((state)=>state.isProcessing)
  const department = useDepartmentStore((state)=>state.departmentData)
  const getAllDepartment = useDepartmentStore((state)=>state.getAllDepartment)

  useEffect(()=>{
    getAllUser();
    getAllDepartment()
    data
    department
  },[])
  let number=0
  console.log(data);
  const [originalData,setOrignalData] = useState(data)
  const [datafilter,setDataFilter] = useState({
    keyword:'',
    department:''
  })
  const handlefilter = ()=>{
     setOrignalData(data?.map((list)=>list.filter((n)=>n.department.includes(datafilter.department)&& n.identificationId.toLowerCase().includes(datafilter.keyword.toLowerCase()))))
    if(datafilter.department===''&&datafilter.keyword===''){
      setOrignalData(data)
    }
  }
  return (
    <div>
        <div className='px-5 mb-5'>
          <h1 className='text-xl uppercase text-[#5B0101]'>Audit</h1><hr className='h-1 bg-red-700 mb-10'/>
        <div className='flex justify-between'>
        <input type='search' placeholder='Identification Number' 
        onChange={(e)=>setDataFilter({...datafilter,keyword:e.target.value})}
        className='outline outline-red-400 bg-transparent w-60'/>
      <div  className='flex gap-5'>
        <select
        onChange={(e)=>setDataFilter({...datafilter,department:e.target.value})}
        className='bg-[#5B0101] text-white  sm:h-10 px-3 rounded-md mb-3'>
            <option value=''>All Department</option>
            {department?.map((dep)=>{
                return(
                  <option value={dep?.initials}>{dep?.name}</option>
                )
              })}
        </select>
        <button onClick={handlefilter} className='h-10'>Search</button>
        </div>
        </div>
        <table id='auditForm' className='mb-5'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Date of Purchase</th>
                    <th>Name & Description</th>
                    <th>Quantity</th>
                    <th>Souce of Finance</th>
                    <th>Identification Number</th>
                    <th>User</th>
                    <th>Department</th>
                    <th>Location</th>
                    <th>Remarks</th>
                    </tr>
            </thead>
            <tbody>

                {(originalData!=null||originalData!=''||!isProcessing)&&
                    originalData.map((item)=>{
                        return item.map((list)=>{
                            number = number+1
                            return(
                                <tr>
                                    <td>{number}</td>
                                    <td>{list.dateOfPurchase}</td>
                                    <td>{list.nameAndDescription}</td>
                                    <td>{list.quantity}</td>
                                    <td>{list.finance}</td>
                                    <td>{list.identificationId}</td>
                                    <td>{list.user}</td>
                                    <td>{list.department}</td>
                                    <td>{list.location}</td>
                                    <td>{list.remarks}</td>
                                </tr>
                            )
                        })
                    })
                }
            </tbody>
        </table>
        <button onClick={handlePrint} className=' float-right'>Print</button>
    </div>
    
        <button onClick={close}>Back</button>
        
    </div>
  )
}

export default Audit