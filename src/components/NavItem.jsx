import React from 'react'
import { Link } from 'react-router-dom'

export default function NavItem({title, to}) {
  return (
    <li className='text-ghost-white hover:text-azure-200 m-1 ml-3 cursor-pointer'>
        <Link to={to}>{title}</Link>
    </li>
  )
}
