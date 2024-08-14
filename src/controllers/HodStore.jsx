import axios from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import {routes} from '../helpers/routes'


export const useHodStore = create((set)=>({
requestData:[],
auditData:[],
staffData:[],
isProcessing:false,

 async createRequest(data){
    set({isProcessing:true})
    const id = localStorage.getItem('id')
    await axios.post(`api/v1/hod/request/${id}`,data)
    .then((res)=>{
        if(res.status === 200 || res.status === 201){
           toast.success('Request successfully sent')
        }
        useHodStore.getState().getAllRequest()
    }).catch((err)=>{
        toast.error(`${err.message}`)
    }).finally(()=>{
        set({isProcessing:false})
    })
},
 async updateRequest(id,data){
    set({isProcessing:true})
    await axios.patch(`api/v1/hod/request/${id}`,data)
    .then((res)=>{
        if(res.status === 200 || res.status === 201){
           toast.success('Request updated successfully')
        }
    }).catch((err)=>{
        toast.error(`${err.message}`)
    }).finally(async ()=>{
       await useHodStore.getState().getAllRequest()
        set({isProcessing:false})
    })
},
async getAllRequest (){
    set({isProcessing:true})
    const id = localStorage.getItem('id')
    await axios.get(`api/v1/user/${id}`)
    .then((res)=>{
        if(res.status == 200){
          const data = res?.data?.data?.request
          set({requestData: data}) 
        }
    })
    .catch((err)=>{
        toast.error(`${err.message}`)
    })
    .finally(()=>{
        set({isProcessing:false})
    })
},

 async deleteRequest(id){
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
            toast.loading('Request is being deleted',{duration:100})
            const Response = await axios.delete(`api/v1/hod/request/${id}`)
            if(Response?.status == 201 || Response.status === 200){
                toast.success('Request is deleted successfully')
            }
          useHodStore.getState().getAllRequest()
    
        }

    }catch(err){
        toast.error(err)
    }
 },

 async getAllAudit(){
    set({isProcessing:true})
    const id = localStorage.getItem('id')
    await axios.get(`api/v1/user/${id}`)
    .then((res)=>{
        if(res.status == 200){
          const data = res?.data?.data?.audit
          set({auditData: data}) 
        }
    })
    .catch((err)=>{
        toast.error(`${err.message}`)
    })
    .finally(()=>{
        set({isProcessing:false})
    })
 },
   
 async createAudit(data){
    set({isProcessing:true})
    const id = localStorage.getItem('id')
    await axios.post(`api/v1/hod/audit/${id}`,data)
    .then((res)=>{
        if(res.status === 200 || res.status === 201){
           toast.success('Audit successfully created')
        }
        useHodStore.getState().getAllRequest()
    }).catch((err)=>{
        toast.error(`${err.message}`)
    }).finally(()=>{
        set({isProcessing:false})
    })
},

async deleteAudit(id){
    try{
        const swalResponse = await Swal.fire({
            title:'Are you sure?',
            text:'You will not be able to retrieve it back',
            icon:'warning',
            showDenyButton:true,
            denyButtonColor:'#d33',
            confirmButtonColor:'#5b0101',
            confirmButtonText:'Yes',
            denyButtonText:'No'
        })
        if (swalResponse.isConfirmed){
            toast.loading('Audit is being deleted',{duration:100})
            const Response = await axios.delete(`api/v1/hod/audit/${id}`)
            if(Response?.status == 201 || Response.status === 200){
                toast.success('Audit is deleted successfully')
            }
          useHodStore.getState().getAllAudit()
    
        }

    }catch(err){
        toast.error(err)
    }
 },

 async updateAudit(id,data){
    set({isProcessing:true})
    await axios.patch(`api/v1/hod/audit/${id}`,data)
    .then((res)=>{
        if(res.status === 200 || res.status === 201){
           toast.success('Request updated successfully')
        }
    }).catch((err)=>{
        toast.error(`${err.message}`)
    }).finally(async ()=>{
       await useHodStore.getState().getAllAudit()
       window.location.replace(routes.AUDIT)
        set({isProcessing:false})
    })
},

async getAllStaff(){
    set({isProcessing:true})
    const id = localStorage.getItem('id')
    await axios.get(`api/v1/user/${id}`)
    .then((res)=>{
        if(res.status == 200){
          const data = res?.data?.data?.staff
          set({staffData: data}) 
        }
    })
    .catch((err)=>{
        toast.error(`${err.message}`)
    })
    .finally(()=>{
        set({isProcessing:false})
    })
 },

 async createStaff(data){
    set({isProcessing:true})
    const id = localStorage.getItem('id')
    await axios.post(`api/v1/hod/staff/${id}`,data)
    .then((res)=>{
        if(res.status === 200 || res.status === 201){
           toast.success('Staff successfully created')
        }
        useHodStore.getState().getAllStaff()
    }).catch((err)=>{
        toast.error(`${err.message}`)
    }).finally(()=>{
        set({isProcessing:false})
    })
},

async updateStaff(id,data){
    set({isProcessing:true})
    await axios.patch(`api/v1/hod/staff/${id}`,data)
    .then((res)=>{
        if(res.status === 200 || res.status === 201){
           toast.success('Staff updated successfully')
        }
       useHodStore.getState().getAllStaff()
    }).catch((err)=>{
        toast.error(`${err.message}`)
    }).finally(async ()=>{    
        set({isProcessing:false})
    })
},

async deleteStaff(id){
    try{
        const swalResponse = await Swal.fire({
            title:'Are you sure?',
            text:'You will not be able to retrieve it back',
            icon:'warning',
            showDenyButton:true,
            denyButtonColor:'#d33',
            confirmButtonColor:'#5b0101',
            confirmButtonText:'Yes',
            denyButtonText:'No'
        })
        if (swalResponse.isConfirmed){
            toast.loading('Staff is being deleted',{duration:100})
            const Response = await axios.delete(`api/v1/hod/staff/${id}`)
            if(Response?.status == 201 || Response.status === 200){
                toast.success('Staff is deleted successfully')
            }
          useHodStore.getState().getAllStaff()
    
        }

    }catch(err){
        toast.error(err)
    }
 },

}))