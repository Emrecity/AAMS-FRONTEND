import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../../components/SideBar';

const MasterDashboard = () => {

  const [toggle, setToggle] = useState(true)
  const date = new Date().toDateString()
  const user = localStorage.getItem('firstname')
  const role = localStorage.getItem('role')

  return (
    <div className='flex sticky bg-slate-100'>
    {toggle && <SideBar />}
    <main className='w-full mx-5'>
     <div className='flex flex-col sm:flex-row  bg-[#DA8080] text-center justify-between sticky top-0 sm:top-2 mb-4 rounded-md px-5'>
       <section className='flex '>
         <button onClick={() => { setToggle(!toggle) }} className='rounded-sm bg-transparent  mr-2 '><svg width="20px" height="30px" viewBox="0 0 0.6 0.6" xmlns="http://www.w3.org/2000/svg" fill="#000000"><path d="M0.6 0.188H0V0.15h0.6zm0 0.3H0V0.45h0.6zm0 -0.151H0V0.3h0.6z"/></svg></button>
         <h1 className='my-auto text-red-700'><b>Dashboard</b></h1>
       </section>

       <ul className='flex flex-col sm:flex-row  gap-2 text-center'>
         <li className='h-16'><div className='flex border-2 border-current px-2 bg-slate-50 py-2 rounded-lg w-full md:w-96 h-10 my-3 md:my-2'>
          
           <input type='search' placeholder='search' className='bg-transparent focus:outline-none w-full place-self-center' /></div></li>
         <div className='flex place-self-center pl-5 gap-5 '>
           <li className='flex text-white gap-x-1'><svg fill="#ffffff" width="20px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M15.71,12.71a6,6,0,1,0-7.42,0,10,10,0,0,0-6.22,8.18,1,1,0,0,0,2,.22,8,8,0,0,1,15.9,0,1,1,0,0,0,1,.89h.11a1,1,0,0,0,.88-1.1A10,10,0,0,0,15.71,12.71ZM12,12a4,4,0,1,1,4-4A4,4,0,0,1,12,12Z"/></svg>
           <div className='flex flex-col'>
             <span>{user}</span>
             <span>{role}</span>
           </div>
           </li>
           <li>
             <small className='text-left text-sm text-white'>{date}</small>
           </li>
         </div>
       </ul>

     </div>

     <Outlet />
   </main>
 </div>
  )
}

export default MasterDashboard