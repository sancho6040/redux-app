import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { login, logout } from '../features/user/userSlice'
import { FaGithub, FaFacebook, FaTwitter } from 'react-icons/fa'
import { FcGoogle, FcInvite } from 'react-icons/fc'

export default function Login() {

  //¿Quiero consultar el estado global?
  const user = useSelector((state) => state.user)

  //¿quiero actualizar el estado global?
  const dispatch = useDispatch()

  //navegacion
  const navigate = useNavigate()

  useEffect(() => {
    if (user.logged) {
      navigate("/")
    }
  }, [user])

  const iniciarSesion = (event) => {
    event.preventDefault()
    const { email: { value: email }, password: { value: password } } = event.target
    dispatch(login({ email, password }))
  }

  // const iniciarSecion = (event) => {
  //   event.preventDefault();

  //   fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/login", {
  //     method: "POST",
  //     credentials: 'include',
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       email: email.value,
  //       password: password.value
  //     })
  //   }).then(res => res.json())
  //     .then(user => {
  //       dispatch(login(user.firstName))
  //       navigate(-1)
  //     }).catch(error => console.log(error))

  // }

  return (
    <div className='grid grid-cols-2 mt-20'>
      <div className='bg-gradient-to-br from-azure-500 to-purple-heart-400 rounded-l-lg flex justify-center items-center'>
        <img src="https://cdn2.iconfinder.com/data/icons/flat-illustrations-1/550/User_Profile-512.png" alt="Imagen"></img>
      </div>
      <main className='p-2 md:p-20 bg-ghost-white rounded-r-lg'>
        <h1 className='text-shark font-semiboldbold text-4xl mb-5'>Iniciar sesión</h1>
        <p className='mb-10 text-shark-200'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, mollitia.</p>
        <form className='flex flex-col' onSubmit={iniciarSesion}>
          <label className='text-shark-300 text-sm'>email...</label>
          <input className='outline-none border-2 border-shark-200 p-2 rounded-md focus:border-azure-100 mb-6' type="email" name='email' />

          <label className='text-shark-300 text-sm'>password...</label>
          <input className='outline-none border-2 border-shark-200 p-2 rounded-md focus:border-azure-100 mb-6' type="password" name='password' />
          <button className='bg-shark-500 py-2 rounded-md text-ghost-white hover:bg-shark-800 hover:text-azure-200'>Iniciar sesión</button>
        </form>
        {user.error && <p>{user.message}</p>}
        {user.loading && <p>loading...</p>}

        <div className='flex items-center gap-3 mt-5'>
          <div className='h-[2px] bg-shark-200 w-full'></div>
          <p className='text-shark-300'>Ó</p>
          <div className='h-[2px] bg-shark-200 w-full'></div>
        </div>
        <a className='flex items-center gap-5 justify-center border-2 border-shark-300 rounded-md p-2 mt-5 hover:bg-white hover:border-azure-200' href="https://backendtzuzulcode.wl.r.appspot.com/auth/google">
          <span className='text-shark '>Inicia sesión con</span><FcGoogle className='self-center h-5 w-5'/>
        </a>
        <a className='flex items-center gap-5 justify-center border-2 border-shark-300 rounded-md p-2 mt-5 hover:bg-white hover:border-azure-200' href="/signup">
          <span className='text-shark '>Crear una cuenta</span><FcInvite className='self-center h-5 w-5'/>
        </a>

        {/* <a className='flex items-center gap-5 justify-center border border-lavender-400 p-2 mt-5 hover:bg-lavender-400' href="https://backendtzuzulcode.wl.r.appspot.com/auth/google">
          <span className='text-lavender-900'>Inicia sesión con</span> <FaGithub />
        </a>
        <a className='flex items-center gap-5 justify-center border border-lavender-400 p-2 mt-5 hover:bg-lavender-400' href="https://backendtzuzulcode.wl.r.appspot.com/auth/google">
          <span className='text-lavender-900'>Inicia sesión con</span> <FaFacebook />
        </a>
        <a className='flex items-center gap-5 justify-center border border-lavender-400 p-2 mt-5 hover:bg-lavender-400' href="https://backendtzuzulcode.wl.r.appspot.com/auth/google">
          <span className='text-lavender-900'>Inicia sesión con</span> <FaTwitter />
        </a> */}

        {/* <button onClick={() => { dispatch(logout()) }}>Cerrar Sesion</button> */}
      </main>


    </div>
  )
}
