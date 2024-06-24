import React, {useEffect,useState} from 'react'
import { useForm } from 'react-hook-form'
import { useDepartmentStore } from '../../controllers/DepartmentStore'
import DeleteButton from '../../components/DeleteButton'
import EditButton from '../../components/EditButton'
import {useModalActions} from '../../components/ModalActions'
import EditDepartmentModal from './EditDepartmentModal'
import DataTable from 'react-data-table-component';

const Department = () => {

  const getAllDepartment = useDepartmentStore((state)=>state.getAllDepartment)
  const submit = useDepartmentStore((state)=>state.createDepartment)
  const handleDelete = useDepartmentStore((state)=>state.deleteDepartment)
  const Data = useDepartmentStore((state)=>state.departmentData)
  const isProcessing = useDepartmentStore((state)=>state.isProcessing)

  useEffect(()=>{
    getAllDepartment(),
    Data
  },[])

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

  const Columns = [
    {
      name:'Name',
      selector:row=>row?.name,
      sortable:true
    },
    {
      name:'Initials',
      selector:row=>row?.initials,
      sortable:true
    },
    {
      name:'Action',
      button:true,
      cell:(row)=>{return(<><EditButton handleClick={()=>{
        setdepData({
          department:row.name,
          initials:row.initials,
          id:row._id
        })
        OpenModal()
      }}/>
      <DeleteButton handleClick={()=>handleDelete(row._id)}/>
      
      </>)}
    },
  ]

  const [depData,setdepData] = useState({
    id:'',
    department:'',
    initials:'',
  })
  const {open:OpenModal,close:CloseModal} = useModalActions('edit_department_modal')
  const {register,handleSubmit,reset} = useForm()

  const onsubmit =(data)=>{
    submit(data)
    reset()
  }

  return (
    <div>
     <h1 className='text-3xl uppercase text-red-700'>Department Page</h1><hr className='h-1 bg-red-900 mb-5'/>
     <div className='grid grid-cols-3 gap-x-5'>
      <div className='w-full px-3 col-span-2'>
      <DataTable progressPending={isProcessing} highlightOnHover columns={Columns} data={Data} pagination customStyles={customStyle}/>
      </div>
      <EditDepartmentModal closeModal={CloseModal}
       id={depData.id} 
       name={depData.department} 
       initials={depData.initials}/>
      <form
      onSubmit={handleSubmit(onsubmit)}
      className='bg-[#DA8080] sm:p-8 rounded-xl h-fit'>
        <h1 className='uppercase text-xl underline text-center text-red-900 font-bold'>Department Forms</h1>
        <div className='flex flex-col gap-y-2 my-3'>
          <label>Name</label>
          <input type='text' placeholder='department name' {...register('name',{required:'name is require'})}/>
        </div>
        <div className='flex flex-col gap-y-2 my-3'>
          <label>Initial</label>
          <input type='text' placeholder='department initials' {...register('initials',{required:' initials is require'})}/>
        </div>
        <button className='font-bold text-xl py-2 mx-auto w-full mt-2'>Add</button>
      </form>
     </div>
    </div>
  )
}

export default Department