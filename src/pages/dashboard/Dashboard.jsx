import React from 'react'

const Dashboard = () => {

  const role = localStorage.getItem('role')

  return (
    <div className='bg-slate-200 py-10 px-5 h-1/2'>
     {role==='admin'&& <h1>Admin Dashboard</h1>}
     {role==='hod'&& <h1>Hod Dashboard</h1>}
     {role==='estate'&& <h1>Estate Dashboard</h1>}
    </div>
  )
}

export default Dashboard