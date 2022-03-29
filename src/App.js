import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// import { validate } from './features/user/userSlice';
import Login from './pages/Login';
import Home from './pages/Home';
import MyTeams from './pages/MyTeams';
import Team from './pages/team';
import Navbar from './components/Navbar'
import DragAndDrop from './pages/DragAndDrop';
import DragAndDrop2 from './pages/DragAndDrop2';
import Signup from './pages/Signup'

function App() {

  //¿Quiero consultar el estado global?
  // const user = useSelector((state) => state.user)

  //¿quiero actualizar el estado global?
  const dispatch = useDispatch()

  useEffect(()=>{
    // dispatch(validate())
  },[])

  // useEffect(()=>{
  //   fetch("https://backendtzuzulcode.wl.r.appspot.com/auth/validate",{
  //     method: "POST",
  //     credentials: 'include'
  //   })
  //   .then(res=>res.json())
  //   .then(data=>{
  //     dispatch(login(data.user.firstName))
  //   })
  // },[])

  return (
    <BrowserRouter>
      <Navbar />
      <div className='max-w-screen-xl mx-auto min-h-screen '>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path="/my_teams" element={<MyTeams />} />
          <Route path="/my_teams/:idTeam" element={<Team/>}/>
          <Route path="/dnd" element={<DragAndDrop />} />
          <Route path="/dnd2" element={<DragAndDrop2 />} />
        </Routes>
      </div>
    </BrowserRouter>);
}

export default App;
