import React from 'react'
import {useNavigate} from 'react-router-dom'
import {routes} from '../../helpers/routes'

const User = () => {
    const navigate = useNavigate()
  return (
    <div>
      <h1 className='text-3xl uppercase text-red-700'>Users Page</h1><hr className='h-1 bg-red-900 mb-5'/>
        <button onClick={()=>navigate(routes.SIGNUP)}>Add User</button>
    </div>
  )
}

export default User