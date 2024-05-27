import React from 'react'
import {usePrint} from '../../components/PrintButton'

const Audit = ({close}) => {
  const {printPage:handlePrint} = usePrint('auditForm')
  return (
    <div>
        <div className='px-5 mb-5'>
        <div className='flex justify-between'>
        <input type='search' placeholder='keyword' className='outline outline-red-400 bg-transparent'/>
     
        <select className='bg-[#5B0101] text-white  sm:h-10 px-3 rounded-md mb-3'>
            <option>Select Department</option>
            <option>Mathematics</option>
            <option>Information Technology</option>
            <option>Catering</option>
            <option>Management</option>
        </select>
        </div>
        <table id='auditForm' className='mb-5'>
            <thead>
                <tr>
                    <th>S/N</th>
                    <th>Date of Purchase</th>
                    <th>Name & Description</th>
                    <th>Quantity</th>
                    <th>Souce of Finance</th>
                    <th>Identification Number</th>
                    <th>User</th>
                    <th>Location</th>
                    <th>Remarks</th>
                    </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>25//01/24</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
        <button onClick={handlePrint}>Print</button>
    </div>
    
        <button onClick={close}>Back</button>
    </div>
  )
}

export default Audit