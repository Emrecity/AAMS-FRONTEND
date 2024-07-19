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

const Columns1 = [
  {
    name:'First Name',
    selector:row=>row.firstname,
    sortable:true
 },
  {
    name:'Middle Name',
    selector:row=>row.middlename,
    sortable:true
 },
  {
    name:'Last Name',
    selector:row=>row.lastname,
    sortable:true
 },
  {
    name:'Phone',
    selector:row=>row.phone,
    sortable:true
 },
]
const Columns2 = [
  {
    name:'First Name',
    selector:row=>row.firstname,
    sortable:true
 },
  {
    name:'Middle Name',
    selector:row=>row.middlename,
    sortable:true
 },
  {
    name:'Last Name',
    selector:row=>row.lastname,
    sortable:true
 },
  {
    name:'Phone',
    selector:row=>row.phone,
    sortable:true
 },
]
const Columns3 = [
  {
    name:'First Name',
    selector:row=>row.firstname,
    sortable:true
 },
  {
    name:'Middle Name',
    selector:row=>row.middlename,
    sortable:true
 },
  {
    name:'Last Name',
    selector:row=>row.lastname,
    sortable:true
 },
  {
    name:'Phone',
    selector:row=>row.phone,
    sortable:true
 },
]
const Columns4 = [
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
    name:'Identification Number',
    selector:row=>row.identificationNumber,
    sortable:true
 },
  {
    name:'Department',
    selector:row=>row.department,
    sortable:true
 },
  {
    name:'Quantity',
    selector:row=>row.quantity,
    sortable:true
 },
]

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
    <h2 className='text-center underline uppercase text-red-700 mb-4 text-xl'>H.O.Ds</h2>
    <DataTable columns={Columns1} data={hod}  pagination/>
    <hr className='h-1 my-5 bg-red-800'/>
    <h2 className='text-center underline uppercase text-red-700 mb-4 text-xl'>Estate Manager</h2>
    <DataTable columns={Columns2} data={estate}  pagination/>
    <hr className='h-1 my-5 bg-red-800'/>
    <h2 className='text-center underline uppercase text-red-700 mb-4 text-xl'>Admin</h2>
    <DataTable columns={Columns3} data={admin}  pagination/>
    <hr className='h-1 my-5 bg-red-800'/>
    <h2 className='text-center underline uppercase text-red-700 mb-4 text-xl'>Asset</h2>
    <DataTable columns={Columns4} data={assetData}  pagination/>
    </>
  )
}

export default AdminDashboard