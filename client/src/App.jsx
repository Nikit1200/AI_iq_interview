import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import InterviewPage from './pages/InterviewPage'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { setAuthChecked, setUserData } from './redux/userSlice'
import InterviewHistory from './pages/InterviewHistory'
import Pricing from './pages/Pricing'
import InterviewReport from './pages/InterviewReport'

export const ServerUrl = import.meta.env.VITE_API_URL || "http://localhost:8000"

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem("interviewiq_token")
      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`
      } else {
        delete axios.defaults.headers.common.Authorization
      }
      try {
        const result = await axios.get(ServerUrl + "/api/user/current-user", { withCredentials: true })
        dispatch(setUserData(result.data))
        console.log(result.data)
      } catch (error) {
        if (error.response?.status !== 401) {
          console.error("Unable to restore the signed-in user:", error)
        }
        dispatch(setUserData(null))
      } finally {
        dispatch(setAuthChecked(true))
      }
    }
    getUser()
  }, [dispatch])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/auth' element={<Auth />} />
      <Route path='/interview' element={<InterviewPage/>}/>
      <Route path='/history' element={<InterviewHistory/>}/>
      <Route path='/pricing' element={<Pricing/>}/>
      <Route path='/report/:id' element={<InterviewReport/>}/>
    </Routes>
  )
}

export default App
