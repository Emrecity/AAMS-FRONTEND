import axios from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

export const useEstateStore = create((set)=>({
    allData:[],
    allAuditData:[],
    allDepartment:[],
    assetData:[],
    isProcessing:false,

    async createAsset(data){
        set({isProcessing:true})
        await axios.post(`api/v1/asset`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Asset created successfully')
            }
          useEstateStore.getState().getAllAsset()
        }).catch((err)=>{
           handleError(err)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },
    async updateAsset(id,data){
        set({isProcessing:true})
        await axios.put(`api/v1/asset/${id}`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Asset updated successfully')
            }
            useEstateStore.getState().getAllAsset()
        }).catch((err)=>{
            handleError(err)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },
    async getAllAsset(){
        set({isProcessing:true})
        await axios.get(`api/v1/asset`)
        .then((res)=>{
            if(res.status == 200){
              const data = res?.data?.data
              set({assetData: data}) 
            }
        })
        .catch((err)=>{
            handleError(err)
        })
        .finally(()=>{
            set({isProcessing:false})
        })
    },
    async deleteAsset(id){
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
                toast.loading('Asset is being deleted',{duration:100})
                const Response = await axios.delete(`api/v1/asset/${id}`)
                if(Response?.status == 201 || Response.status === 200){
                    toast.success('Asset is deleted successfully')
                }
                useEstateStore.getState().getAllAsset()
        
            }
    
        }catch(err){
            handleError(err)
        }
     },
     async getAllData(){
        set({isProcessing:true})
        await axios.get(`api/v1/user`)
        .then((res)=>{
            if(res.status == 200){
              const data = res?.data?.data
              const requestData = data?.map((user)=>{return (user.request.map((item)=>item))})
              set({allData: requestData}) 
            }
        })
        .catch((err)=>{
            handleError(err)
        })
        .finally(()=>{
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
            handleError(err)
        }).finally(async ()=>{
           await useEstateStore.getState().getAllData()
            set({isProcessing:false})
        })
    },

     async getAllAuditData(){
        set({isProcessing:true})
        await axios.get(`api/v1/user`)
        .then((res)=>{
            if(res.status == 200){
              const data = res?.data?.data
              const auditData = data?.map((user)=>{return (user.audit.map((item)=>item))})
              set({allAuditData: auditData}) 
            }
        })
        .catch((err)=>{
            handleError(err)
        })
        .finally(()=>{
            set({isProcessing:false})
        })
    },
}))

const handleError =(err)=>{
    if(err.response.status ===400){
        toast.error('Already exist')
    } else {
        const errMessage= err.response?.data
        toast.error(errMessage.message);
    }
}