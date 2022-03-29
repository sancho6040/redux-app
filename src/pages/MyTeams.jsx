import React, { useEffect, useState } from 'react'
import { FaWindowClose } from 'react-icons/fa'
import {Link} from 'react-router-dom'
import { get, post } from '../api'

export default function MyTeams() {

    const [teams, setTeams] = useState([]);
    const [modaleOpened, setModaleOpened] = useState(false);

    const addTeams = (e) => {
        e.preventDefault();
        const { name, image, description } = e.target
        const newTeam = {
            name: name.value,
            img: image.value,
            description: description.value
        }
        post("/teams", newTeam)
            .then(res => {
                setTeams([...teams, newTeam])
            })

        // setTeams([...teams, newTeam])
        setModaleOpened(false)
    }

    useEffect(() => {
        get("/teams")
            .then(res => setTeams(res.data))
            .catch(error => console.log(error))
    }, [])

    return (
        <div>
            <button onClick={() => { setModaleOpened(true) }} className='bg-sunset-600 mt-5 py-1 px-3 font-bold text-white rounded-md hover:bg-sunset-700'>Agregar team</button>
            <section className='grid grid-cols-3 gap-5 mt-10'>
                {teams.map(team => <article key={team._id} className='bg-shark-100 rounded-md'>
                    <Link to={"/my_teams/" + team._id}>
                        <div className='text-shark'>
                            <h2 className='font-bold text-2xl hover:text-sunset-600'>{team.name}</h2>
                            <p>{team.description}</p>
                        </div>
                        <img className='h-48 w-full object-cover object-center transition-all hover:object-bottom duration-1000 rounded-b-md' src={team.img} alt={team.img} />
                    </Link>
                </article>)}
            </section>
            {modaleOpened &&
                <div>
                    <div className='fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-30' onClick={() => { setModaleOpened(false) }}></div>
                    <div className='bg-white w-2/4 md:w-1/4 fixed left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg'>
                        <button className='absolute right-5 top-5' onClick={() => { setModaleOpened(false) }}><FaWindowClose className='w-8 h-8 text-shark hover:text-sunset-700' /></button>
                        <h2 className='p-5 text-shark text-3xl font-bold'> Crear equipo nuevo</h2>
                        <form className='flex flex-col p-5' onSubmit={addTeams}>
                            <input className='p-4 bg-shark-100 outline-none border border-shark-400 focus:border-sunset-500 my-3 rounded-md' required name="name" type="text" placeholder='name...' />
                            <input className='p-4 bg-shark-100 outline-none border border-shark-400 focus:border-sunset-500 my-3 rounded-md' required name="image" type="text" placeholder='Portada...' />
                            <input className='p-4 bg-shark-100 outline-none border border-shark-400 focus:border-sunset-500 my-3 rounded-md' name="description" type="text" placeholder='Descripcion...' />
                            <button className='bg-shark mt-5 py-4 text-xl font-bold text-ghost-white rounded-md hover:bg-sunset-700'>Crear equipo</button>
                        </form>
                    </div>
                </div>

            }

        </div>
    )
}
