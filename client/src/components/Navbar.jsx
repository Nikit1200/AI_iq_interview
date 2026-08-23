import { motion } from "motion/react"
import { useSelector,useDispatch } from 'react-redux'
import {BsRobot,BsCoin} from "react-icons/bs";
import { FaUserAstronaut } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { ServerUrl } from '../App'
import { setUserData } from '../redux/userSlice'
import AuthModel from './AuthModel'



function Navbar(){
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const[showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setshowAuth] = useState(!userData);

    const handleLogout = async ()=>{
        try{
            await axios.get(ServerUrl + "/api/auth/logout",{withCredentials:true})
            localStorage.removeItem("interviewiq_token")
            delete axios.defaults.headers.common.Authorization
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")
        } catch(error){
            console.log(error)
        }
    }
  return (
    <div className='flex justify-center bg-[#f3f3f3] px-5 pt-4 sm:px-7'>
        <motion.div 
        initial = {{opacity:0,y:-40}}
        animate={{opacity:1,y:0}}
        transition={{duration:1.05}}
        className='w-full bg-white rounded-[28px] border border-[#e5e5e5] px-9 py-5 shadow-sm flex justify-between items-center'>
            <div className='flex items-center gap-3 cursor-pointer'>
                <div className = 'bg-slate-950 text-white p-2 rounded-lg'>
                    <BsRobot size={18} />
                </div>
                <h1 className='font-semibold text-slate-950 text-xl'>InterviewIQ.AI</h1>
            </div>
            <div className = 'flex items-center gap-6 relative'>
            <div className='relative'>
                <button onClick={()=>{
                    if(!userData){
                        setshowAuth(true)
                        return;
                    }
                    
                    setShowCreditPopup(!showCreditPopup);
                    setShowUserPopup(false)
                    }}  className='flex items-center gap-2 bg-[#f5f5f5] px-5 py-2.5 rounded-full text-base font-medium text-slate-900 hover:bg-slate-200 transition'>
                    <BsCoin size={20}/>
                    {userData?.credits || 0}
                </button>
                {showCreditPopup && (
                    <div className='absolute right-[-50px] mt-3 w-64 bg-white shadow-xl border border-gray-200 rounded-xl p-5 z-50'>
                        <p className="text-sm text-gray-600 mb-4">Need more credits to continue interviews?</p>
                        <button onClick={()=>navigate("/pricing")} className = 'w-full bg-black text-white py-2 rounded-lg text-sm'> Buy more credits

                        </button>
                    </div>
                )}
                </div>
                <div className='relative'>
            <button 
            onClick={()=>{
                if(!userData){
                    setshowAuth(true)
                    return;
                }    
                setShowUserPopup(!showUserPopup);
                setShowCreditPopup(false)
            }}
            className='w-9 h-9 bg-black text-white rounded-full flex items-center justify-center font-semibold'>
                    {userData?.name ? userData.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16} />}
                </button>
                {showUserPopup && (
                    <div className = 'absolute right-0 mt-3 w-48 bg-white shadow-xl border border-gray-200 rounded-xl p-4 z-50'>
                        <p className='text-md text-blue-500 font-medium mb-1'>{userData?.name}</p>
                        <button onClick={()=>navigate("/history")} className='w-full text-left text-sm py-2 hover:text-black text-gray-600'>InterView History</button>
                         <button onClick = {handleLogout}
                          className='w-full text-left text-sm py-2 flex items-center gap-2 text-red-500'>
                            <HiOutlineLogout size = {16}/>
                            logout</button>
                    </div>
                )}
            </div>
            </div>

        </motion.div>
        {showAuth && <AuthModel onClose={()=>setshowAuth(false)}/>}
    </div>
  )
}

export default Navbar
