import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { get, post } from '../api'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { FaWindowClose, FaGripVertical, FaPlus } from 'react-icons/fa'


export default function Team() {
    const params = useParams()

    const [team, setTeam] = useState()
    const [lists, setLists] = useState([])
    const [id_lists, setid_Lists] = useState()
    const [tasks, setTasks] = useState([])

    const [modaleOpened, setModaleOpened] = useState(false);
    const [modaleTasksOpened, setModaleTasksOpened] = useState(false);

    useEffect(() => {
        get("/teams/" + params.idTeam)
        .then(res => {
            setTeam(res.data)
            setLists(res.data.lists)
        })
        .catch(error => console.log(error))

        // get("/tasks/"+params.idTeam)
        // .then(res=>{console.log("/tasks/"+params.idTeam)})
        // .catch(error => console.log(error))



    }, [])

    const getTasks = (id_task) =>{

    }

    const addList = (e) => {
        e.preventDefault();
        const { name, description } = e.target
        const newList = {
            name: name.value,
            description: description.value,
            tasks: [],
        }
        post("/teams/" + params.idTeam + "/addList", newList)
            .then(res => {
                setLists([...lists, newList])
            })

        setLists([...lists, newList])
        setModaleOpened(false)

    }

    const addTask = (e) => {
        e.preventDefault();
        const { name, description, assigned } = e.target
        const newTask = {
            name: name.value,
            description: description.value,
            assigned: [JSON.parse(assigned.value)],
        }
        post("lists/"+id_lists+"/addTask", newTask)
            .then(res => {
                setTasks([...tasks, newTask])
            })
        
        
        // setTasks([...tasks, newTask])
        setModaleTasksOpened(false)

    }


    const reorder = (list, startIndex, endIndex) => {
        const result = [...list]; //Generar una copia
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };


    const onDragEndList = ({ source, destination }) => {
        if (!destination) {
            console.log("No hacer nada")
            return
        }
        setLists(reorder(lists, source.index, destination.index))
    }
    const onDragEndTask = ({ source, destination }) => {
        if (!destination) {
            console.log("No hacer nada")
            return
        }
        setTasks(reorder(tasks, source.index, destination.index))
    }

    return (
        <main className=''>
            {/* <h2 className='text-3xl'>{team.name}</h2>
            <p>{team.description}</p>
            <div>
                <h2 className='font-bold text-lg'>Members</h2>
                {team.members.map((member, index)=>{
                    return <div className='flex gap-3'>
                        <p>{member._id.name}</p>
                        <p className='text-purple-600'>{member.role}</p>
                    </div>
                })}
            </div> */}
            {/* <button onClick={() => { setModaleOpened(true) }} className='bg-lavender-900 mt-5 py-1 px-3 font-bold text-white rounded-md hover:bg-lavender-700'>Agregar lista</button> */}
            <section className='mt-10 bg-ghost-white p-5'>
                <DragDropContext onDragEnd={onDragEndList}>
                    <Droppable droppableId='droppable' direction='horizontal'>
                        {(provided, snapshot) => {
                            return <div
                                className='flex overflow-x-auto gap-5'
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {lists.map((list, index) => {
                                    return <Draggable key={index} draggableId={"" + index} index={index}>
                                        {(provided, snapshot) => {
                                            return <article
                                                className='flex-shrink-0 w-1/3 bg-shark-400 p-3 rounded-md'
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <h2 className='text-white mb-2'>{list.name}</h2>
                                                <DragDropContext onDragEnd={onDragEndList}>
                                                    <Droppable droppableId={'droppable' + index} direction='vertical'>
                                                        {(provided, snapshot) => {
                                                            return <div
                                                                className=' space-y-3'
                                                                ref={provided.innerRef}
                                                                {...provided.droppableProps}
                                                            >
                                                                {list.tasks.map((task, i) => {
                                                                    return <Draggable key={"draggable" + index + i} draggableId={"draggable" + index + i} index={i}>
                                                                        {(provided, snapshot) => {
                                                                            return <div
                                                                                className='flex flex-shrink-0 w-full h-10 bg-shark-50 rounded-md items-center'
                                                                                ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}
                                                                            >
                                                                                <FaGripVertical className='text-shark p-0.5'/>
                                                                                <p className='text-shark'>{task.name}</p>
                                                                                {/* {console.log(task.assigned)} */}
                                                                            </div>
                                                                        }}
                                                                    </Draggable>
                                                                })}
                                                                {provided.placeholder}
                                                                <button onClick={() => { 
                                                                    setid_Lists(lists[index]._id)
                                                                    setModaleTasksOpened(true)
                                                                    }} className=' flex flex-shrink-0 w-full h-10 bg-shark-50 text-shark items-center justify-center rounded-md'><FaPlus className='m-2'/></button>
                                                            </div>
                                                        }}
                                                    </Droppable>
                                                </DragDropContext>
                                            </article>
                                        }}
                                    </Draggable>

                                })}
                                {provided.placeholder}

                                <button onClick={() => { setModaleOpened(true); }} className='flex flex-shrink-0 w-1/4 border-2 border-shark p-3 h-80 bg-shark-200 text-shark items-center justify-center rounded-md'><FaPlus className='h-16'/></button>
                            </div>
                        }}
                    </Droppable>
                </DragDropContext>
            </section>
            {/* --------------------------modal listas------------------------------ */}
            {modaleOpened &&
                <div>
                    <div className='fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-30' onClick={() => { setModaleOpened(false) }}></div>
                    <div className='bg-white w-2/4 md:w-1/4 fixed left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg'>
                        <button className='absolute right-5 top-5' onClick={() => { setModaleOpened(false) }}><FaWindowClose className='w-8 h-8 text-shark hover:text-purple-800' /></button>
                        <h2 className='p-5 text-shark text-3xl font-bold'>Nueva lista</h2>
                        <form className='flex flex-col p-5' onSubmit={addList}>
                            <input className='p-4 bg-shark-100 outline-none border border-shark-400 focus:border-purple-700 my-3 rounded-md' required name="name" type="text" placeholder='name...' />
                            <input className='p-4 bg-shark-100 outline-none border border-shark-400 focus:border-purple-700 my-3 rounded-md' name="description" type="text" placeholder='Descripcion...' />
                            <button className='bg-shark mt-5 py-4 text-xl font-bold text-ghost-white rounded-md hover:bg-purple-800'>Crear lista</button>
                        </form>
                    </div>
                </div>

            }
            {/* ------------------------modal tareas------------------------------------- */}
            {modaleTasksOpened &&
                <div>
                    <div className='fixed left-0 top-0 h-screen w-screen bg-black bg-opacity-30' onClick={() => { setModaleTasksOpened(false) }}></div>
                    <div className='bg-white w-2/4 md:w-1/4 fixed left-1/2 transform -translate-x-1/2 top-1/2 -translate-y-1/2 rounded-lg'>
                        <button className='absolute right-5 top-5' onClick={() => { setModaleTasksOpened(false) }}><FaWindowClose className='w-8 h-8 text-shark hover:text-purple-800' /></button>
                        <h2 className='p-5 text-shark text-3xl font-bold'>Nueva tarea</h2>
                        <form className='flex flex-col p-5' onSubmit={addTask}>
                            <input className='p-4 bg-shark-100 outline-none border border-shark-400 focus:border-purple-700 my-3 rounded-md' required name="name" type="text" placeholder='name...' />
                            <input className='p-4 bg-shark-100 outline-none border border-shark-400 focus:border-purple-700 my-3 rounded-md' name="description" type="text" placeholder='Descripcion...' />
                            {team.members.map((member, index) =>{
                                return <div key={index + 1}>
                                    {/* {console.log(member._id)} */}
                                    <input type="checkbox" key={index +2} value={JSON.stringify(member._id)} name="assigned"/><label key={index +3}>{member._id.name}</label>
                                </div>
                            })}
                            <button className='bg-shark mt-5 py-4 text-xl font-bold text-ghost-white rounded-md hover:bg-purple-800'>Crear tarea</button>
                        </form>
                    </div>
                </div>

            }
        </main>
    )
}