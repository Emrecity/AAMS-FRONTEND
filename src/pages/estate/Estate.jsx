import React,{useState} from 'react'
import Card from '../../components/Card'
import Department from './Department'
import Audit from './Audit'
import Request from './Request'
import Asset from './Asset'

const Estate = () => {

  const [show,setShow] = useState(true)
  const [page,setPage] =useState('')

  return (
    <div className='bg-slate-200 py-10 px-5'>
        <h1 className='text-lg font-semibold'>Estate Manager Page</h1><hr className='h-1 bg-red-700 mb-3'/>
     {show && <ul className='grid grid-cols-2 sm:grid-cols-4 gap-5 sm:mt-10'>

        <li onClick={()=>{
          setPage('request')
          setShow(!show)
        }}><Card text='View Request'/></li>

        <li onClick={()=>{
          setPage('audit')
          setShow(!show)
        }}><Card text='View Audit Form'/></li>
        
        <li onClick={()=>{
          setPage('department')
          setShow(!show)
        }}><Card text='View Department' /></li>

        <li onClick={()=>{
          setPage('asset')
          setShow(!show)
        }}><Card text='View All Asset' /></li>

      </ul> }

      {!show&& (page=='department'&&<Department close={()=>setShow(true)}/>)}
      {!show&& (page=='audit'&&<Audit close={()=>setShow(true)}/>)}
      {!show&& (page=='request'&&<Request close={()=>setShow(true)}/>)}
      {!show&& (page=='asset'&&<Asset close={()=>setShow(true)}/>)}
    </div>
  )
}

export default Estate