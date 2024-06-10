import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {routes} from '../../helpers/routes'
import {useUserStore} from '../../controllers/UserStore'
import DeleteButton from '../../components/DeleteButton'

const User = () => {
    const navigate = useNavigate()
    const handleDelete = useUserStore((state)=>state.deleteUser)
    const getUsers = useUserStore((state)=>state. getAllUsers)
    const data = useUserStore((state)=>state.data)
    const isProcessing = useUserStore.getState().isProcessing
    const [toggle,setToggle] = useState(false)
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


  return (
    <div>
      <h1 className='text-3xl uppercase text-red-700'>Users Page</h1><hr className='h-1 bg-red-900 mb-5'/>
      <div className='flex justify-between px-3'>

        <input type='search' placeholder='search email,phone,name'
         value={datafilter} onChange={(e)=>{setFilter(e.target.value) 
         }}
        className='bg-transparent text-black'/>
      
        <button onClick={()=>navigate(routes.SIGNUP)}>Add User</button>
      </div>
      <table className='mt-5'>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Middlename</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Action</th>

          </tr>
        </thead>
        <tbody>
          {
          UserData?.map((dat)=>{
            return(
              <tr key={dat?._id}>
                <td>{dat?.firstname}</td>
                <td>{dat?.lastname}</td>
                <td>{dat?.middlename}</td>
                <td>{dat?.email}</td>
                <td>{dat?.phone}</td>
                <td>{dat?.role}</td>
                <td><DeleteButton  handleClick={()=>{
                     handleDelete(dat?._id)
                    setToggle(!toggle)
                     }}/></td>
              </tr>
            )
          })}
        </tbody>
      </table>
      
    </div>
  )
}

export default User