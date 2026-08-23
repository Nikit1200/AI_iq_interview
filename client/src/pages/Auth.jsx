import { FaRobot } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../utils/firebase'
import axios from 'axios'
import { ServerUrl } from '../App'
import {useDispatch} from 'react-redux';
import {setUserData} from '../redux/userSlice';
import { useNavigate } from 'react-router-dom'

const Auth = ({isModel = false}) => {
const dispatch = useDispatch()
const navigate = useNavigate()

const handleGoogleAuth = async () => {
    try{
        const response = await signInWithPopup(auth, provider)
        let User = response.user
        let name = User.displayName
        let email= User.email
        const result = await axios.post(ServerUrl + "/api/auth/google", {name,email},{withCredentials:true})
        dispatch(setUserData(result.data))
        navigate("/")
        
    } catch(error){
        console.log(error)
        dispatch(setUserData(null))
    }
}
    return (
    <div className={`w-full ${isModel ? "py-4":"min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}`}>
        <motion.div
        initial={{opacity:0, y:-40}}
        animate={{opacity:1,y:0}}
        transition={{duration:1.05}}
         className={`w-full ${isModel ? "max-w-md p-8  rounded-3xl" :"max-w-lg p-12 rounded-[32px]"} bg-white shadow-2xl border border-gray-200`}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className = 'bg-black text-white p-2 rounded-lg'>  
                    <FaRobot size={18}/> 

                </div>
                
                <h2 className='font-semibold text-lg'>InterView.AI</h2>
            </div>
            <h1 className='text-3xl font-bold tracking-tight text-slate-950 text-center leading-tight mb-4'>
                Your next interview starts with
                <span className='mt-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full inline-flex items-center gap-2 text-lg'>
                    <IoSparkles />
                    AI Smart Interview
                </span>
            </h1>
            <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.
            </p>

            <motion.button type='button'
            onClick = {handleGoogleAuth}
            whileHover = {{opacity:0.9,scale:1.03}} 
            whileTap = {{opacity:1, scale:0.98}}
            className='w-full flex items-center justify-center gap-3 py-3.5 bg-slate-950 text-white rounded-full shadow-md font-medium focus:outline-none focus:ring-4 focus:ring-slate-200'>
                <FcGoogle size={20} />
                Continue with Google

            </motion.button>
        </motion.div>
    </div>
    
  )
}

export default Auth
