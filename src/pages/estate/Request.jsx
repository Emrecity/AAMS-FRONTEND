import React, { useState } from 'react'
import EditButton from '../../components/EditButton'
import DeleteButton from '../../components/DeleteButton'

const Request = ({ close }) => {
  return (
    <div className="bg-gray-200 py-5 px-10">
      <div className='flex justify-between mb-5'>
        <h1 className="text-[#5B0101] text-xl font-bold">All Requests</h1>
        <select className='bg-[#5B0101] text-white  sm:h-10 px-3 rounded-md mb-3'>
        <option>Select Department</option>
            <option>Mathematics</option>
            <option>Information Technology</option>
            <option>Catering</option>
            <option>Management</option>
        </select>
      </div>
          <table>
            <thead>
              <tr>
                <th>S/N</th>
                <th>Name of Asset</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Response</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Laptop</td>
                <td>Dell X360</td>
                <td>5</td>
                <td></td>
              </tr>
            </tbody>
          </table>
      
      <div className="btn-back" style={{margin:"10px"}}>
        <button className="bg-red-900 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={close}>Back</button>
      </div>    
    </div>
  )
}

export default Request