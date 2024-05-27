import React,{useState} from 'react'
import ViewAuditForm from './ViewAuditForm'
import AuditForm from './AuditForm'

const Audit = () => {
  const[open,setOpen]=useState(false);
  return (
    <div className='bg-slate-200 py-5'>
    <div className='flex justify-between p-5'>
        <h1 className='text-[#5B0101] underline text-xl font-bold'>{!open?'H.O.Ds Audit ':'Audit Form'}</h1>
        <button onClick={()=>setOpen(!open)}>{!open?'Fill Form':'Back'}</button>
    </div>
       {!open?<ViewAuditForm/>:<AuditForm/>} 

    </div>
  )
}

export default Audit