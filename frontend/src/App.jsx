
import './App.css'
import Navbar from './components/Navbar'
import './pages/Home'
import Home from './pages/Home'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Login from './AuthPage/Login'
import Signup from './AuthPage/Signup'
import Doubt from './pages/Doubt'
import ProfilePage from './pages/ProfilePage'
import EducatorList from './pages/EducatorList'
import EducatorProfilePage from './pages/EducatorProfilePage'
import ProfileEdit from './pages/ProfileEdit'
import RequestList from './pages/RequestList'
import FollowerList from './pages/FollowerList'
import ChatPage from './pages/ChatPage'
import FollowingPage from './pages/FollowingPage'
import AllDoubts from './pages/AllDoubts'
function App() {
  

  return (
    <>
     
    <Navbar/>   
    <Routes>
      <Route path='/' element={<Home/>}/>     
      <Route path='/login'element={<Login/>}/>
      <Route path='/signup'element={<Signup/>}/> 
      <Route path='/alldoubts'element={<AllDoubts/>}/>     
      <Route path='/doubt/:id'element={<Doubt/>}/> 
      <Route path='/profile'element={<ProfilePage/>}  /> 
      <Route path='/following' element={<FollowingPage/>} /> 
      <Route path='/educator/list'element={<EducatorList/>}/>
      <Route path='/educator/profile/:id'element={<EducatorProfilePage/>}/>
      <Route path='/educator/:id'element={<EducatorProfilePage/>}/>
      <Route path='/educator/profile/edit'element={<ProfileEdit/>}/>
      <Route path="/requests" element={<RequestList />} />
      <Route path="/educator/followers" element={<FollowerList />} />
      <Route path="/chat/:id" element={<ChatPage />} />
    </Routes>
    
   
    </>
  )
}

export default App
