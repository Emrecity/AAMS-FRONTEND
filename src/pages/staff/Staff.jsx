import React,{useEffect,useState} from 'react'
import AddStaffModal from './AddStaffModal'
import EditStaffModal from './EditStaffModal'
import {useModalActions} from '../../components/ModalActions'
import EditButton from '../../components/EditButton'
import DeleteButton from '../../components/DeleteButton'
import { useHodStore } from '../../controllers/HodStore'

const Staff = () => {

    const {open:OpenModal,close:CloseModal} = useModalActions('add_staff_modal')
    const {open:OpenEditModal,close:CloseEditModal} = useModalActions('edit_staff_modal')
    const getAllStaff = useHodStore((state)=>state.getAllStaff)
    const handleDelete = useHodStore((state)=>state.deleteStaff)
    const data = useHodStore((state)=>state.staffData)

    useEffect(()=>{
        getAllStaff()
        data
    },[])
   const [sfilter,SetFilter] = useState()
   const [updata,setUpdata] = useState({
    id:'',
    staffid:'',
    title:'',
    firstname:'',
    lastname:'',
    othername:'',
    gender:'',
    phone:'',
    email:'',
    office:''
   })
   const data1 = data.filter((n)=>{
    if(sfilter){
        return n.firstname.toLowerCase().includes(sfilter.toLowerCase())||n.lastname.toLowerCase().includes(sfilter.toLowerCase())||n.email.toLowerCase().includes(sfilter.toLowerCase())||n.office.toLowerCase().includes(sfilter.toLowerCase())
    }
    return n
   })    
  return (
    <div className=' bg-slate-200 px-5 py-10'>
        <h1 className='text-3xl uppercase text-red-700'>Staff page</h1><hr className='h-1 bg-red-900 mb-5 mt-2'/>
        <div className='flex justify-between'>
            <input type='search'  placeholder='search name,email,phone' value={sfilter} onChange={(e)=>SetFilter(e.target.value)} className='bg-transparent border border-2 border-red-400 px-3'/>
            <button onClick={()=>OpenModal()}>Add Staff</button>
        </div>
        <table className='my-5'>
            <thead>
                <th>Name</th>
                <th>Staff ID</th>
                <th>Gender</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Office</th>
                <th>Action</th>
            </thead>
            <tbody>
                {data?
                data1.map((n)=>{
               return <tr key={n._id}>
                    <td>{n?.title}{' '}{n?.firstname}{' '}{n?.lastname}{' '}{n?.othername}</td>
                    <td>{n?.staffid}</td>
                    <td>{n?.gender}</td>
                    <td>{n?.email}</td>
                    <td>{n?.phone}</td>
                    <td>{n?.office}</td>
                    <td><EditButton handleClick={()=>{
                        setUpdata({
                            id:n._id,
                            staffid:n.staffid,
                            title:n.title,
                            firstname:n.firstname,
                            lastname:n.lastname,
                            othername:n.othername,
                            gender:n.gender,
                            email:n.email,
                            phone:n.phone,
                            office:n.office
                        })
                        OpenEditModal()
                    }}/> <DeleteButton handleClick={()=>handleDelete(n._id)}/></td>
                </tr>
                }):'loading'
            }
                
            </tbody>
            <tbody>

            </tbody>
        </table>
        <AddStaffModal closeModal={CloseModal}/>
        <EditStaffModal closeModal={CloseEditModal}
         id={updata.id}
         staffid={updata.staffid}
         firstname={updata.firstname}
         lastname={updata.lastname}
         othername={updata.othername}
         gender={updata.gender}
         email={updata.email}
         phone={updata.phone}
         title={updata.title}
         office={updata.office}
         />
    </div>
  )
}

export default Staff