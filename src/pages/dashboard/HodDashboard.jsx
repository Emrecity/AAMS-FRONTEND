import React,{useState,useEffect} from 'react'
import Card from '../../components/Card'
import Datatable from 'react-data-table-component'
import { useHodStore } from '../../controllers/HodStore'
import BarChart from '../../components/BarChart'
import DoughnutChart from '../../components/Doughnut'

const HodDashboard = () => {

    const staffData = useHodStore((state)=>state.staffData)
    const requestData = useHodStore((state)=>state.requestData)
    const auditData = useHodStore((state)=>state.auditData)
    const isProcessing = useHodStore((state)=>state.isProcessing)

    useEffect(()=>{
        staffData,
        requestData,
        auditData
    },[isProcessing])

    const pendingData = requestData.filter((n)=>n.status ==='pending')
    const acceptData = requestData.filter((n)=>n.status ==='accept')
    const rejectData = requestData.filter((n)=>n.status ==='reject')
    const[userData,setUserData] = useState({
        labels:['Pending','Accept','Reject'],
        datasets:[{
            label:"Requests",
            data: [pendingData.length,acceptData.length,rejectData.length],
            backgroundColor:['skyblue','lightgreen','rgb(127,28,28)'],
            borderColor:'black',
            borderWidth:3
        }]
    })

    const columns = [
        {
            name:'Name',
            selector:row=>row.name,
            sortable:true
        },
        {
            name:'Description',
            selector:row=>row.description,
            sortable:true
        },
        {
            name:'Quantity',
            selector:row=>row.quantity,
            sortable:true
        }
    ]
    const column = [
        {
            name:'Name And Description',
            selector:row=>row.nameAndDescription,
            sortable:true
        },
        {
            name:'User',
            selector:row=>row.user,
            sortable:true
        },
        {
            name:'Quantity',
            selector:row=>row.quantity,
            sortable:true
        }
    ]

  return (<>
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-x-3'>
        <Card text="Total Requests" number={requestData.length}/>
        <Card text="Pending Request"  number={pendingData.length}/>
        <Card text="Accepted Request"  number={acceptData.length}/>
        <Card text="Rejected Request"  number={rejectData.length}/>
        <Card text="Number Of Staff" number={staffData.length}/>
        <Card text="Total Assets" number={auditData.length}/>
    </div><hr className='my-10 bg-red-900 h-1'/>
   <h1 className='text-center text-4xl uppercase mb-5 text-red-700'>Request Report</h1>
    <div className='grid grid-cols-2 justify-between gap-x-40 my-5 h-1/8'>
   {userData?.datasets ? <div className='w-full h-72'><BarChart data={userData}/></div>:"loading"}
   {userData?.datasets.data!=[] ? <div className='h-72 w-fit'><DoughnutChart data={userData}/></div>:"loading"}
    </div>
    
    <div className='my-5'>
         <h1 className='text-center uppercase mb-3 underline text-3xl text-red-700'>Pending Request</h1>
         <Datatable columns={columns} data={pendingData} pagination/>
    </div>
    <hr  className='my-10 bg-red-900 h-1'/>
    <div>
         <h1 className='text-center uppercase mb-3 underline text-3xl text-red-700'>Asset Table</h1>
         <Datatable columns={column} data={auditData} pagination/>
    </div>
    </>
  )
}

export default HodDashboard