import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {routes} from '../../helpers/routes'
import {useUserStore} from '../../controllers/UserStore'
import DeleteButton from '../../components/DeleteButton'
import DataTable from 'react-data-table-component';


const User = () => {
    const navigate = useNavigate()
    const handleDelete = useUserStore((state)=>state.deleteUser)
    const getUsers = useUserStore((state)=>state. getAllUsers)
    const data = useUserStore((state)=>state.data)
    
  useEffect(()=>{
    data,
    getUsers()

  },[])
  const [datafilter,setFilter] = useState('')
  const UserData = data?.filter((user)=>{
      if(datafilter!=null){
        return user.firstname.toLowerCase().includes(datafilter)||user.lastname.toLowerCase().includes(datafilter)||user.email.toLowerCase().includes(datafilter)||user.phone.toLowerCase().includes(datafilter)
      }
      return user
  })

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
 
  let number = 0

  const Columns =[
    {
      name:"S/N",
      selector:()=>number = number + 1/2,
      sortable:true
    },
    {
      name:"Firstname",
      selector:row=>row?.firstname,
      sortable:true
    },
    {
      name:"Lastname",
      selector:row=>row?.lastname,
      sortable:true
    },
    {
      name:"Email",
      selector:row=>row?.email,
      sortable:true
    },
    {
      name:"Phone",
      selector:row=>row?.phone,
      sortable:true
    },
    {
      name:"Role",
      selector:row=>row?.role,
      sortable:true
    },
    {
      name:"Actions",
      button:true,
      cell:(row)=>{return <> <DeleteButton handleClick={()=>handleDelete(row._id)}/></>}
    },
  ]


  return (
    <div>
      <h1 className='text-3xl uppercase text-red-700'>Users Page</h1><hr className='h-1 bg-red-900 mb-5'/>
      <div className='flex justify-between px-3 mb-5'>

        <input type='search' placeholder='search email,phone,name'
         value={datafilter} onChange={(e)=>{setFilter(e.target.value) 
         }}
        className='bg-transparent text-black'/>
      
        <button onClick={()=>navigate(routes.SIGNUP)}>Add User</button>
      </div>
      {data && <DataTable responsive customStyles={customStyle} highlightOnHover pointerOnHover columns={Columns} data={UserData} pagination/> }
    </div>
  )
}

export default User