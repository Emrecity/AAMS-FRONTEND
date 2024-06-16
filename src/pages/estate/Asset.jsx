import React,{useEffect,useState} from 'react'
import {useForm} from 'react-hook-form'
import { useEstateStore } from '../../controllers/EstateStore'
import DeleteButton from '../../components/DeleteButton'
import EditButton from '../../components/EditButton'
import {useModalActions} from '../../components/ModalActions'
import EditAssetModal from './EditAssetModal'
import { useDepartmentStore } from '../../controllers/DepartmentStore'

const Asset = ({close}) => {
    const {register,handleSubmit,reset} = useForm()
    const submit = useEstateStore((state)=>state.createAsset)
    const getAllAsset = useEstateStore((state)=>state.getAllAsset)
    const handleDelete = useEstateStore((state)=>state.deleteAsset)
    const data = useEstateStore((state)=>state.assetData)
    const data1 = useEstateStore((state)=>state.allData)
    const getAllUser = useEstateStore((state)=>state.getAllData)
    const department = useDepartmentStore((state)=>state.departmentData)
    const getAllDepartment = useDepartmentStore((state)=>state.getAllDepartment)

    useEffect(()=>{
        getAllAsset(),
        getAllDepartment()
        getAllUser()
        department
        data
    },[])

    const {open:OpenModal,close:CloseModal} = useModalActions('edit_asset_modal')
    const [assetData,setAssetData] = useState({
        id:'',
        name:'',
        description:'',
        dateOfPurchase:'',
        quantity:'',
        identificationNumber:'',
        department:''
    })
    const onsubmit=(data)=>{
        submit(data)
        reset()
    }
    const RequestData = data1?.map((list)=>list.filter((n)=>{
       
        return n.status ==='accept'
      
      }))
 
  return (
    <>
    <div className='grid sm:grid-cols-3 gap-5 my-5'>
        <section className='col-span-2 border border-red-500 p-5'>
            <table>
                <thead>
                    <tr>
                        <th>Name and Description</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        <th>Id</th>
                        <th>Depart</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.map((asset)=>{
                        return(
                            <tr>
                                <td>{asset?.name}{' '}{asset?.description}</td>
                                <td>{asset?.dateOfPurchase}</td>
                                <td>{asset?.quantity}</td>
                                <td>{asset?.identificationNumber}</td>
                                <td>{asset?.department}</td>
                                <td className='flex gap-x-1 border-none'>
                                    <EditButton handleClick={()=>{
                                        setAssetData({
                                            id:asset._id,
                                            name:asset.name,
                                            description:asset.description,
                                            dateOfPurchase:asset.dateOfPurchase,
                                            quantity:asset.quantity,
                                            identificationNumber:asset.identificationNumber,
                                            department:asset.department
                                        })
                                        OpenModal()
                                    }}/>
                                    <DeleteButton handleClick={()=>{
                                    handleDelete(asset?._id)
                                }}/></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <EditAssetModal
             closeModal={CloseModal}
             id = {assetData.id}
             name = {assetData.name}
             description={assetData.description}
             dateOfPurchase={assetData.dateOfPurchase}
             identificationNumber={assetData.identificationNumber}
             quantity={assetData.quantity}
             department1={assetData.department}
             />
        </section>
        <form 
        onSubmit={handleSubmit(onsubmit)}
        className='p-5 bg-red-400 rounded-md sm:mt-5'>
            <h1 className='text-2xl font-bold uppercase text-center text-red-700'>Asset form</h1>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Name</label>
                <select {...register('name')} className='h-8 rounded-md'>
                    <option>Name</option>
                   {
                    RequestData?.map((list)=>list.map((n)=>{
                        return <option key={n._id} value={n.name}>{n.name}</option>
                    }))
                   }
                </select>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Description</label>
                <select {...register('description')} className='h-8 rounded-md'>
                    <option>Description</option>
                   {
                    RequestData?.map((list)=>list.map((n)=>{
                        return <option key={n._id} value={n.description}>{n.description}</option>
                    }))
                   }
                </select>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Date Of Purchase</label>
                <input type='date' placeholder='Enter name of asset'{...register('dateOfPurchase')}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Quantity</label>
                <input type='number' min={1} {...register('quantity')}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Identification Number</label>
                <input type='text' placeholder='Enter identificaiton Number'{...register('identificationNumber')}/>
            </div>
            <div className='flex flex-col gap-y-2 my-4'>
                <label>Department</label>
                <select {...register('department')}>
                    <option value=''>Select Department</option>
                    {department?.map((dep)=>{
                return(
                  <option value={dep?.initials}>{dep?.name}</option>
                )
              })}
                </select>
            </div>
            <div className='flex gap-x-3 mt-3 place-content-center'>
                <button>Add</button>
                <button type='button'>Cancel</button>
            </div>
        </form>

    </div>
        
        <button onClick={close}>Back</button>
    </>
  )
}

export default Asset