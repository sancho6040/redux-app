import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import { login, logout, signup } from '../features/user/userSlice'
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

    const crearCuenta = (event) => {
        event.preventDefault()
        const { 
            name: { value: name }, 
            birthday: { value: birthday }, 
            city: { value: city }, 
            email: { value: email }, 
            password: { value: password } 
        } = event.target
        dispatch(signup({ name, birthday, city, email, password }))
        // console.log({ name, birthday, city, email, password })
    }


    return (
        <div className='grid grid-cols-2 mt-20'>
            <main className='p-2 md:p-20 bg-ghost-white rounded-r-lg'>
                <h1 className='text-shark font-semiboldbold text-4xl mb-5'>Crear cuenta</h1>
                <form className='flex flex-col' onSubmit={crearCuenta}>
                    <input className='outline-none border-2 border-shark-200 p-2 rounded-md focus:border-azure-100 mb-6' type="text" name='name' placeholder='nombre...'/>
                    <input className='outline-none border-2 border-shark-200 p-2 rounded-md focus:border-azure-100 mb-6' type="date" name='birthday' placeholder='fecha de nacimiento...'/>
                    <input className='outline-none border-2 border-shark-200 p-2 rounded-md focus:border-azure-100 mb-6' type="text" name='city' placeholder='ciudad...'/>
                    <input className='outline-none border-2 border-shark-200 p-2 rounded-md focus:border-azure-100 mb-6' type="email" name='email' placeholder='E-mail...'/>
                    <input className='outline-none border-2 border-shark-200 p-2 rounded-md focus:border-azure-100 mb-6' type="password" name='password' placeholder='contraseña...'/>
                    <button className='bg-shark-500 py-2 rounded-md text-ghost-white hover:bg-shark-800 hover:text-azure-200'>crear</button>
                </form>
                {user.error && <p>{user.message}</p>}
                {user.loading && <p>loading...</p>}
            </main>
            <div className='bg-gradient-to-br from-azure-500 to-purple-heart-400 rounded-l-lg flex justify-center items-center'>
                <img src="https://cdn2.iconfinder.com/data/icons/flat-illustrations-1/550/User_Profile-512.png" alt="Imagen"></img>
            </div>


        </div>
    )
}
