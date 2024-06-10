import React from 'react'
import { useNavigate } from 'react-router-dom'
import {routes} from '../helpers/routes'
import { useUserStore } from '../controllers/UserStore'

const SideBar = () => {

  const role = localStorage.getItem('role')
  const navigate = useNavigate()
  const logout = useUserStore((state)=>state.logout)

  return (
    <div className='sticky scroll-m-2 top-0 left-0 bg-[#5B0101] h-screen text-sm sm:text-lg w-full sm:w-2/5 md:w-2/12 rounded  text-white pl-3'>
    <div className='text-center uppercase mb-5 sm:mb-10'>
      <img src='aamusteLogo.jpg' alt='Aamusted Logo' className='w-fit sm:w-24 mx-auto'/>
      <span> Assets Management System (aams)</span>
    </div>
    <ul className='flex flex-col gap-y-4'>
    <li onClick={()=>navigate(routes.DASHBOARD)} className='flex gap-x-3 side-bar-nav'><svg width="30" height="30" viewBox="0 0 0.563 0.563" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M.105.037H.103Q.09.037.081.039a.06.06 0 0 0-.042.042Q.036.091.037.103v.094q0 .013.002.022a.06.06 0 0 0 .042.042l.022.002h.094Q.21.263.219.261A.06.06 0 0 0 .261.219Q.264.21.263.197V.103Q.263.09.261.081A.06.06 0 0 0 .219.039Q.21.036.197.037zM.089.075.105.074h.09l.016.001a.02.02 0 0 1 .014.014v.106L.224.211A.02.02 0 0 1 .21.225H.105L.089.224A.02.02 0 0 1 .075.21V.105L.076.089A.02.02 0 0 1 .09.075M.367.037H.365q-.013 0-.022.002a.06.06 0 0 0-.042.042L.3.103v.094Q.3.21.302.219a.06.06 0 0 0 .041.042l.023.002H.46q.013 0 .022-.002A.06.06 0 0 0 .523.219Q.526.21.525.197V.103Q.525.09.523.081A.06.06 0 0 0 .482.039Q.472.036.459.037zM.351.075.367.074h.09l.016.001a.02.02 0 0 1 .014.014v.106L.486.211a.02.02 0 0 1-.014.014H.367L.351.224A.02.02 0 0 1 .337.21V.105L.338.089A.02.02 0 0 1 .352.075M.103.3h.094Q.21.3.219.302a.06.06 0 0 1 .042.041l.002.023V.46q0 .013-.002.022a.06.06 0 0 1-.042.041Q.21.526.197.525H.103Q.09.525.081.523A.06.06 0 0 1 .039.482Q.036.472.037.459V.365q0-.013.002-.022A.06.06 0 0 1 .081.301zm.002.037L.089.338a.02.02 0 0 0-.014.014v.105l.001.016A.02.02 0 0 0 .09.487h.106L.212.486A.02.02 0 0 0 .226.472V.367L.225.351A.02.02 0 0 0 .211.337H.195zM.368.3H.366Q.353.3.344.302a.06.06 0 0 0-.043.041L.3.366V.46q0 .013.002.022a.06.06 0 0 0 .041.041q.01.003.022.002h.094q.013 0 .022-.002A.06.06 0 0 0 .523.481Q.525.471.525.459V.365q0-.013-.002-.022A.06.06 0 0 0 .482.301L.459.3H.367M.351.338.367.337h.09l.016.001a.02.02 0 0 1 .014.014v.106L.486.474a.02.02 0 0 1-.014.014H.367L.351.487A.02.02 0 0 1 .337.473V.367L.338.351A.02.02 0 0 1 .352.337" fill="#000"/></svg>Dashboard</li>

      {(role == 'hod'|| role == 'admin')&& 
      <li 
      onClick={()=>navigate(routes.HOD)}
      className='flex gap-x-3 side-bar-nav'>
      <svg version="1.1" width="30px" height="30px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 297" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 297 297">
<g>
  <path d="m214.577,140.942c-4.22-1.35-16.475-5.056-16.995-5.214-4.664-1.411-9.618,1.067-11.287,5.645l-23.111,63.411-5.437-37.649 10.407-18.024c1.641-2.842 1.641-6.343 0-9.184-1.641-2.842-4.672-4.592-7.954-4.592h-23.399c-3.282,0-6.313,1.751-7.954,4.592-1.641,2.842-1.641,6.343 0,9.184l10.409,18.029-5.348,37.897-23.203-63.664c-1.669-4.578-6.624-7.058-11.287-5.645-0.52,0.157-12.775,3.864-16.995,5.214-23.111,7.397-38.639,28.895-38.639,53.496v93.377c0,5.072 4.112,9.184 9.184,9.184h191.062c5.072,0 9.184-4.112 9.184-9.184v-93.377c0.001-24.601-15.527-46.099-38.637-53.496zm-152.424,137.689v-84.193c7.10543e-15-16.582 10.396-31.05 25.869-36.002 1.776-0.569 5.149-1.607 8.403-2.601l43.445,119.205c0.511,1.401 1.34,2.622 2.387,3.592h-80.104zm172.694-.001h-80.106c1.048-0.97 1.877-2.191 2.388-3.592l43.446-119.204c3.253,0.994 6.628,2.032 8.403,2.601 15.473,4.952 25.869,19.419 25.869,36.002v84.193z"/>
  <path d="m148.499,113.899c31.402,0 56.95-25.548 56.95-56.95s-25.547-56.949-56.95-56.949-56.949,25.547-56.949,56.949 25.547,56.95 56.949,56.95zm0-95.53c21.273,0 38.582,17.307 38.582,38.58s-17.308,38.582-38.582,38.582-38.58-17.308-38.58-38.582 17.307-38.58 38.58-38.58z" />
</g>
</svg>
 H.O.Ds</li>}


      {(role == 'estate'|| role == 'admin')&&
       <li
       onClick={()=>navigate(routes.ESTATE)}
       className='flex gap-x-3 side-bar-nav'>
      <svg fill="#000000" width="30px" height="30px" viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>house-solid</title>
      <path class="clr-i-solid clr-i-solid-path-1" d="M33,19a1,1,0,0,1-.71-.29L18,4.41,3.71,18.71a1,1,0,0,1-1.41-1.41l15-15a1,1,0,0,1,1.41,0l15,15A1,1,0,0,1,33,19Z" stroke='000000'></path><path class="clr-i-solid clr-i-solid-path-2" d="M18,7.79,6,19.83V32a2,2,0,0,0,2,2h7V24h6V34h7a2,2,0,0,0,2-2V19.76Z"></path>
      <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
      </svg>
        Estate Manager</li>}


      {(role == 'hod'|| role =='admin') && 
      <li 
      onClick={()=>navigate(routes.AUDIT)}
      className='flex gap-x-3 side-bar-nav'>
      <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 7C4 5.11438 4 4.17157 4.58579 3.58579C5.17157 3 6.11438 3 8 3H16C17.8856 3 18.8284 3 19.4142 3.58579C20 4.17157 20 5.11438 20 7V15C20 17.8284 20 19.2426 19.1213 20.1213C18.2426 21 16.8284 21 14 21H10C7.17157 21 5.75736 21 4.87868 20.1213C4 19.2426 4 17.8284 4 15V7Z" stroke="#000000" stroke-width="2"/>
<path d="M15 18L15 21M9 18L9 21" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
<path d="M9 8L15 8" stroke="#000000" stroke-width="2" stroke-linecap="round"/>
<path d="M9 12L15 12" stroke="#33363F" stroke-width="2" stroke-linecap="round"/>
</svg>
  Audit Form</li>}

   { role ==='admin'&&   <li onClick={()=>navigate(routes.SETTINGS)} className='flex gap-x-3 side-bar-nav'>
      <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
 width="30px" height="30px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve">
<line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="36" y1="34" x2="41" y2="39"/>
<rect x="46.257" y="35.065" transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 120.5036 47.0858)" fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" width="8.485" height="26.87"/>
<polygon fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" points="12,16 18,10 8,4 6,6 "/>
<line fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" x1="28" y1="26" x2="15" y2="13"/>
<path fill="none" stroke="#000000" stroke-width="2" stroke-miterlimit="10" d="M58,12.5l-8,3.75l-4-4.125l3.5-8.062l0,0
C39.5,4.062,37,9,37,14v4L3.5,52l-1.75,6l2.125,2l6.062-1.5L44,25h4C53,25,58,22.5,58,12.5L58,12.5z"/>
</svg>
        settings</li>}


      <li onClick={logout} className='flex gap-x-3 side-bar-nav'><svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 4L17.5 4C20.5577 4 20.5 8 20.5 12C20.5 16 20.5577 20 17.5 20H14M3 12L15 12M3 12L7 8M3 12L7 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>Log Out</li>
    </ul>
  </div>
  )
}

export default SideBar