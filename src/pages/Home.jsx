import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';

export default function Main() {

  const {logged} = useSelector(state => state.user);
  const navigate = useNavigate();
  var zelda = "";

  logged? zelda = "my_teams" : zelda = "/login"

  return <main className='min-h-screen px-24 flex flex-col bg-ghost-white'>
    <h1 className='self-start ml-5 py-5 font-bold text-5xl text-azure-500'>Main Page</h1>
    <Link to={zelda} className='bg-shark-200 rounded-md p-2'>
      <img className='rounded-md w-full' src="https://images.unsplash.com/photo-1506784926709-22f1ec395907?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1168&q=80" alt="" />
    </Link>
  </main>
}
