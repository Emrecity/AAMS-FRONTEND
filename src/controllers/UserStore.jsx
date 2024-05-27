import axios from 'axios';
import { create } from 'zustand';
import { toast } from 'react-hot-toast';
import {routes} from '../helpers/routes'


export const useUserStore = create((set)=>({

    isProcessing:false,
     async login(data){
        set({isProcessing:true})
       await axios.post('api/v1/login',data)
        .then((res)=>{
            if(res.status === 200){
                const data =res?.data?.data          
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
            toast.error(`${err.message}`)
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

}))