import axios from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import {routes} from '../helpers/routes'
import Swal from 'sweetalert2';


export const useUserStore = create((set)=>({
    data:[],
    UserData:[],
    isProcessing:false,
     async login(data){
        set({isProcessing:true})
       await axios.post('api/v1/login',data)
        .then((res)=>{
            if(res.status === 200){
                const data =res?.data?.data   
                set({UserData:data})       
                localStorage.setItem('token', data?.token);
                localStorage.setItem('role',data?.role);
                localStorage.setItem('firstname',data?.firstname)
                localStorage.setItem('middlename',data?.middlename)
                localStorage.setItem('lastname',data?.lastname)
                localStorage.setItem('email',data?.email)
                localStorage.setItem('gender',data?.gender)
                localStorage.setItem('phone',data?.phone)
                localStorage.setItem('department',data?.department)
                localStorage.setItem('id',data?._id)
                toast.success('User Login Successful')
                window.location.replace(routes.DASHBOARD)
            }
        })
        .catch((err)=>{
            handleError(err)
        })
        .finally(()=>{
            set({isProcessing:false})
        })
    },


    logout() {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                localStorage.removeItem('firstname')
                localStorage.removeItem('middlename')
                localStorage.removeItem('lastname')
                localStorage.removeItem('email')
                localStorage.removeItem('phone')
                localStorage.removeItem('department')
                localStorage.removeItem('id')
        window.location.replace(routes.LOGIN);
    },

    async forgotPassword(data){
        set({isProcessing:true})
       await axios.post('api/v1/login/forget-password',data)
        .then((res)=>{
            if(res.status === 200){
                const data =res?.data          
                 localStorage.setItem('token', data?.token)
                 window.location.replace(routes.RESET_PASSWORD)
               // console.log(data)
            }
        })
        .catch((err)=>{
            handleError(err)
        })
        .finally(()=>{
            set({isProcessing:false})
        })
    },
    
    async resetPassword(data){
        set({isProcessing:true})
        await axios.patch(`api/v1/login/reset-password`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('Password successfully updated')
               window.location.replace(routes.LOGIN)
            }
        }).catch((err)=>{
            handleError(err)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },

    async createUser(data){
        set({isProcessing:true})
        await axios.post(`api/v1/user`,data)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
               toast.success('User successfully created')
            }
            useUserStore.getState().getAllUsers()
        }).catch((err)=>{
            handleError(err)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },

    async getAllUsers(){
        set({isProcessing:true})
        await axios.get(`api/v1/user`)
        .then((res)=>{
            if(res.status === 200 || res.status === 201){
              const userdata = res?.data?.data
              set({data:userdata})
            }
        }).catch((err)=>{
            toast.error(`${err.message}`)
        }).finally(()=>{
            set({isProcessing:false})
        })
    },

    async deleteUser(id){
        try{
            set({isProcessing:true})
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
                toast.loading('User is being deleted',{duration:100})
                const Response = await axios.delete(`api/v1/user/${id}`)
                if(Response?.status == 201 || Response.status === 200){
                    toast.success('User is deleted successfully')
                }
                await useUserStore.getState().getAllUsers()
            }
            set({isProcessing:false})
        }catch(err){
            toast.error(err)
        }
     },

}))

const handleError =(err)=>{
    if(err.response.status ===400){
        toast.error('Already exist')
    }else if(err.response.status ===404){
        toast.error(err?.response?.data?.message)
    }
    else if(err.response.status === 500){
        toast.error(err.message)
    }
    else {
 
        toast.error(err.response?.data.message);
    }
}