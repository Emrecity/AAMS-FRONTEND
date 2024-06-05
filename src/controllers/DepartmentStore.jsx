import axios from 'axios'
import { create } from 'zustand'
import {toast} from 'react-hot-toast'
import Swal from 'sweetalert2'

export const useDepartmentStore = create((set)=>({
    departmentData:[],
    isProcessing :false,

    async getAllDepartment(){
        set({isProcessing:true})
        await axios.get(`api/v1/department`)
        .then((res)=>{
            if(res.status == 200){
              const data = res?.data?.data
              set({departmentData: data}) 
            }
        })
        .catch((err)=>{
            toast.error(`${err.message}`)
        })
        .finally(()=>{
            set({isProcessing:false})
        })
    },


    async createDepartment(data){
        set({isProcessing:true})
        await axios.post(`api/v1/department`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Department successfully created')
            }
           useDepartmentStore.getState().getAllDepartment()
        }).catch((err)=>{
            toast.error(`${err.message}`)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },


    async deleteDepartment(id){
        try{
            const swalResponse = await Swal.fire({
                title:'Are you sure ?',
                text:'You will not be able to retrieve it back',
                icon:'warning',
                showDenyButton:true,
                denyButtonColor:'#d33',
                confirmButtonColor:'#5b0101',
                confirmButtonText:'Yes',
                denyButtonText:'No'
            })
            if (swalResponse.isConfirmed){
                toast.loading('Department is being deleted',{duration:100})
                const Response = await axios.delete(`api/v1/department/${id}`)
                if(Response?.status == 201 || Response.status === 200){
                    toast.success('Department is deleted successfully')
                }
              useDepartmentStore.getState().getAllDepartment()
        
            }
    
        }catch(err){
            toast.error(err)
        }
     },
})) 