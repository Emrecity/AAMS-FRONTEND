import React from 'react'

const Asset = ({close}) => {
  return (
    <>
    <div className='grid sm:grid-cols-3 gap-5 my-5'>
        <section className='col-span-2 border border-red-500 p-5'>
            <table>
                <thead>
                    <tr>
                        <th>Name and Description</th>
                        <th>Date Of Purchase</th>
                        <th>Quantity</th>
                        <th>Identification N0</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </section>
        <form className='p-5 bg-red-400 rounded-md sm:mt-5'>
            <h1 className='text-2xl font-bold uppercase text-center text-red-700'>Asset form</h1>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Name And Description</label>
                <input type='text' placeholder='Enter name of asset'/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Date Of Purchase</label>
                <input type='text' placeholder='Enter name of asset'/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Quantity</label>
                <input type='text' placeholder='Enter name of asset'/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Identification Number</label>
                <input type='text' placeholder='Enter name of asset'/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Department</label>
                <select>
                    <option>Select Department</option>
                </select>
            </div>
            <div className='flex gap-x-3 mt-3 place-content-center'>
                <button>Add</button>
                <button>Cancel</button>
            </div>
        </form>

    </div>
        
        <button onClick={close}>Back</button>
    </>
  )
}

export default Asset