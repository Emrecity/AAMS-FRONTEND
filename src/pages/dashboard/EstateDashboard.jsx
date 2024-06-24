import React,{useEffect} from 'react'
import Card from '../../components/Card'
import DataTable from 'react-data-table-component'
import {useVenueStore} from '../../controllers/VenueStore'
import {useDepartmentStore} from '../../controllers/DepartmentStore'
import { useEstateStore } from '../../controllers/EstateStore'

const EstateDashboard = () => {

const departData = useDepartmentStore((state)=>state.departmentData)
const venueData = useVenueStore((state)=>state.venueData)
const assetData = useEstateStore((state)=>state.assetData)
const requestData = useEstateStore((state)=>state.allData)
const request = requestData.map((list)=>list.filter((n)=>n.status =='pending'))
let number=0
const length = request.map((item)=>{
  return item.map((n)=>{
    number = number + 1
  })
})

console.log(number)

  return (
    <>
    <div className='grid grid-cols-4 gap-x-2'>
      <span className=' h-48'><Card text="Total Request" number={number}/></span>
      <span className=' h-48'><Card text="Total Department" number={departData.length}/></span>
      <span className=' h-48'><Card text="Total Venues" number={venueData.length}/></span>
      <span className=' h-48'><Card text="Movable Asset" number={assetData.length}/></span>
    </div>
    <hr className='h-1 my-5 bg-red-800'/>
    <DataTable/>
    <hr className='h-1 my-5 bg-red-800'/>
    <DataTable/>
    <hr className='h-1 my-5 bg-red-800'/>
    <DataTable/>
    </>
  )
}

export default EstateDashboard