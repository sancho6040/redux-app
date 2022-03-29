import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate} from 'react-router-dom'
import { logout } from '../features/user/userSlice'
import NavItem from './NavItem'
import {FiMenu, FiXCircle, FiTrello} from 'react-icons/fi'

export default function Navbar() {

  const { logged } = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false);

  const navigate = useNavigate()

  // const signOut = () =>{
  //     fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/logout",{
  //         method: "POST",
  //         credentials: 'include'
  //     })
  //     .then(res=>res.json())
  //     .then(data=>{
  //         dispatch(logout())
  //     })
  // }

  const signOut = () => {
    dispatch(logout())
    navigate("/login")
  }

  return (
    // sm: small screen, lg:large md:medium
    //bg-lavender-600 py-3 sm:bg-lavender-500 md:bg-lavender-300 lg:bg-lavender-100
    <nav className='bg-shark py-3'>
      <div className='max-w-screen-xl mx-auto flex justify-between relative'>
        <Link to="/" className='flex items-center'><FiTrello className='h-10 w-10 mx-5 text-ghost-white hover:text-azure-200'></FiTrello><h1 className='ml-2 md:ml-0 text-2xl font-bold text-ghost-white hover:text-azure-200'>Redux-tasks</h1></Link> 
        <ul className={`${open?"block":"hidden"} bg-shark-700 md:bg-transparent text-right md:flex absolute right-7 top-7 md:static p-2 pl-10 md:p-0 gap-3  md:space-x-0`}>
          {/* <NavItem to="/" title={"link"}/>
          <NavItem to="/" title={"link"}/>
          <NavItem to="/" title={"link"}/>
          <NavItem to="/" title={"link"}/> */}
          <NavItem to="/dnd" title={"DnD"}/>
          <NavItem to="/dnd2" title={"DnD2"}/>
          {logged? <NavItem to="/my_teams" title={"My teams"}/> : <NavItem to="/login" title={"My teams"}/>}
          
          {logged ? <li onClick={signOut} className='text-ghost-white hover:text-azure-200 m-1 ml-3 cursor-pointer'>Cerrar Sesión</li> : <NavItem to="/login" title={"Iniciar sesión"}/>}
        </ul>
        {/* mr: marggin-rigth 2 */}
        <button className='block md:hidden mr-2 md:mr-0 text-ghost-white' onClick={()=>{setOpen(!open)}}>{open?<FiXCircle className='h-7 w-7'/>:<FiMenu className='h-7 w-7'/>}</button>
      </div>
    </nav>
  )
}
