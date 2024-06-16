import axios from 'axios'
import { create } from 'zustand'
import {toast} from 'react-hot-toast'
import Swal from 'sweetalert2'

export const useVenueStore = create((set)=>({
    venueData:[],
    roomData:[],
    isProcessing:false,

    async getAllVenue(){
        set({isProcessing:true})
        await axios.get(`api/v1/venue`)
        .then((res)=>{
            if(res.status == 200){
              const data = res?.data?.data
              set({venueData: data}) 
              set({roomData:data?.rooms})
            }
        })
        .catch((err)=>{
            toast.error(`${err.message}`)
        })
        .finally(()=>{
            set({isProcessing:false})
        })
    },

    async createVenue(data){
        set({isProcessing:true})
        await axios.post(`api/v1/venue`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Venue successfully created')
            }
           useVenueStore.getState().getAllVenue()
        }).catch((err)=>{
            toast.error(`${err.message}`)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },

    async updateVenue(id,data){
        set({isProcessing:true})
        await axios.put(`api/v1/venue/${id}`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Venue updated successfully')
            }
           useVenueStore.getState().getAllVenue()
        }).catch((err)=>{
            toast.error(`${err.message}`)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },

    async deleteVenue(id){
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
                toast.loading('Venue is being deleted',{duration:100})
                const Response = await axios.delete(`api/v1/venue/${id}`)
                if(Response?.status == 201 || Response.status === 200){
                    toast.success('Venue is deleted successfully')
                }
              useVenueStore.getState().getAllVenue()
        
            }
    
        }catch(err){
            toast.error(err)
        }
     },


    async createRoom(id,data){
        set({isProcessing:true})
        await axios.post(`api/v1/venue/${id}`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Room successfully created')
            }
           useVenueStore.getState().getAllVenue()
        }).catch((err)=>{
            toast.error(`${err.message}`)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },

    async updateRoom(id,data){
        set({isProcessing:true})
        await axios.patch(`api/v1/venue/room/${id}`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Venue updated successfully')
            }
           useVenueStore.getState().getAllVenue()
        }).catch((err)=>{
            toast.error(`${err.message}`)
        }).finally(()=>{
            set({isProcessing:false})
        }) 
    },
    
    async deleteRoom(id){
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
                toast.loading('Room is being deleted',{duration:100})
                const Response = await axios.delete(`api/v1/venue/room/${id}`)
                if(Response?.status == 201 || Response.status === 200){
                    toast.success('Room is deleted successfully')
                }
              useVenueStore.getState().getAllVenue()
        
            }
    
        }catch(err){
            toast.error(err)
        }
    }
}))