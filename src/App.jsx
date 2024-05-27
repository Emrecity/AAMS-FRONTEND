import { Routes,Route } from "react-router-dom"
import axios from 'axios';
import { routes } from './helpers/routes'
import Login from './pages/authencation/login/Login'
import ForgotPassword from './pages/authencation/forgotpassword/ForgotPassword'
import Signup from './pages/authencation/signup/SignUp'
import ResetPassword from './pages/authencation/resetpassword/ResetPassword'
import MasterDashboard from "./pages/masterdashboard/MasterDashboard"
import Dashboard from './pages/dashboard/Dashboard'
import Hod from "./pages/hod/Hod"
import Audit from './pages/audit/Audit'
import Estate from './pages/estate/Estate'
import Setting from './pages/setting/Setting'

function App() {

  const user_token = localStorage.getItem('token')
  axios.defaults.headers.common["Accept"] = "application/json";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = `Bearer ${user_token}`;
  axios.defaults.baseURL = `${import.meta.env.VITE_API_BASE_URL}`

  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Login/>}/>
      <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword/>}/>
      <Route path={routes.SIGNUP} element={<Signup/>}/>
      <Route path={routes.RESET_PASSWORD} element={<ResetPassword/>}/>
      <Route element={<MasterDashboard/>}>
        <Route path={routes.DASHBOARD} element={<Dashboard/>}/>
        <Route path={routes.HOD} element={<Hod/>}/>
        <Route path={routes.AUDIT} element={<Audit/>}/>
        <Route path={routes.ESTATE} element={<Estate/>}/>
        <Route path={routes.SETTINGS} element={<Setting/>}/>
      </Route>
    </Routes>
  
  )
}

export default App
