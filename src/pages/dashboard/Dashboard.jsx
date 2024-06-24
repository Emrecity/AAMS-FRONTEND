import React,{useEffect} from 'react'
import AdminDashboard from './AdminDashboard'
import HodDashboard from './HodDashboard'
import EstateDashboard from './EstateDashboard'
import { useHodStore } from '../../controllers/HodStore'
import {useVenueStore} from '../../controllers/VenueStore'
import {useDepartmentStore} from '../../controllers/DepartmentStore'
import { useEstateStore } from '../../controllers/EstateStore'
import { useUserStore } from '../../controllers/UserStore'

const Dashboard = () => {

  const role = localStorage.getItem('role')
  const getAllAudit = useHodStore((state)=>state.getAllAudit)
  const getAllStaff = useHodStore((state)=>state.getAllStaff)
  const getAllRequest = useHodStore((state)=>state.getAllRequest)
  const getAllDepartment = useDepartmentStore((state)=>state.getAllDepartment)
  const getAllVenue = useVenueStore((state)=>state.getAllVenue)
  const getAllAsset = useEstateStore((state)=>state.getAllAsset)
  const getAllRequestData = useEstateStore((state)=>state.getAllData)
  const getAllUsers = useUserStore((state)=>state.getAllUsers)

  useEffect(()=>{
    getAllAudit()
    getAllRequest()
    getAllStaff()
    getAllDepartment()
    getAllVenue()
    getAllAsset()
    getAllRequestData()
    getAllUsers()
},[])

  return (
    <div className='bg-slate-200 py-10 px-5'>
     {role==='admin'&& <AdminDashboard/>}
     {role==='hod'&& <HodDashboard/>}
     {role==='estate'&& <EstateDashboard/>}
    </div>
  )
}

export default Dashboard