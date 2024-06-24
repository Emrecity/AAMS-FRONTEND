import React from 'react'
import Card from '../../components/Card'
import DataTable from 'react-data-table-component'
import {useVenueStore} from '../../controllers/VenueStore'
import {useDepartmentStore} from '../../controllers/DepartmentStore'
import { useEstateStore } from '../../controllers/EstateStore'
import {useUserStore} from '../../controllers/UserStore'

const AdminDashboard = () => {

const departData = useDepartmentStore((state)=>state.departmentData)
const venueData = useVenueStore((state)=>state.venueData)
const assetData = useEstateStore((state)=>state.assetData)
const userData = useUserStore((state)=>state.data)
const requestData = useEstateStore((state)=>state.allData)

let number=0

const admin = userData.filter((item)=>item.role =='admin')
const hod = userData.filter((item)=>item.role =='hod')
const estate = userData.filter((item)=>item.role =='estate')
const request =  requestData.map((item)=>{
  return item.map((n)=>{
    number = number + 1
  })
})

  return (
    <>
    <div className='grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-x-3'>
      <Card text='Total Users' number={userData.length}/>
      <Card text='Admin' number={admin.length}/>
      <Card text='H.O.Ds' number={hod.length}/>
      <Card text='Manager' number={estate.length}/>
      <Card text='Departments' number={departData.length}/>
      <Card text='Venues' number={venueData.length}/>
      <Card text='Asset' number={assetData.length}/>
      <Card text='Request' number={number}/>
    </div>
    <hr className='h-1 my-5 bg-red-800'/>
    <DataTable/>
    <hr className='h-1 my-5 bg-red-800'/>
    <DataTable/>
    <hr className='h-1 my-5 bg-red-800'/>
    <DataTable/>
    <hr className='h-1 my-5 bg-red-800'/>
    <DataTable/>
    </>
  )
}

export default AdminDashboard