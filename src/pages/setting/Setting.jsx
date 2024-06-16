import React,{useState, useEffect} from 'react'
import Venue from './Venue'
import Department from './Department'
import User from './User'
import {useUserStore} from '../../controllers/UserStore'

const Setting = () => {
  const [page,setPage] = useState('venue')
  const getUsers = useUserStore((state)=>state. getAllUsers)
  useEffect(()=>{
    getUsers()
  },[page])

  return (
    <div className='bg-slate-200 p-5'>
       <ul className='flex flex-row place-content-center gap-x-5'>
      <li onClick={()=>{
          setPage('venue')
         
        }} className='settings-tabs'>Venue</li>

      <li onClick={()=>{
          setPage('department')
          
        }} className='settings-tabs'>Department</li>

      <li onClick={()=>{
          setPage('user')
      
        }}className='settings-tabs'>Users</li>
  
         </ul>
         {page === 'venue' && <Venue/>}
         {page === 'department' && <Department/>}
         {page === 'user' && <User/>}
    </div>
  )
}

export default Setting