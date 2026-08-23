import { useEffect, useState } from 'react'
import Step2Interview from '../components/Step2Interview'
import Step1SetUp from '../components/step1SetUp'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const InterviewPage = () => {
  const[step, setStep]  = useState(1)
  const[interviewData, setInterviewData] = useState(null)
  const navigate = useNavigate()
  const { userData, authChecked } = useSelector((state) => state.user)

  useEffect(() => {
    if (authChecked && !userData) navigate('/auth', { replace: true })
  }, [authChecked, navigate, userData])

  if (!authChecked) {
    return <div className='min-h-screen flex items-center justify-center text-gray-500'>Checking your session...</div>
  }

  if (!userData) return null
  return (
    <div className= 'min-h-screen bg-gray-50'>
        {step===1 && (
            <Step1SetUp onStart={(data)=>{
                setInterviewData(data);
                setStep(2)
            }}/>
    )}

    {step===2 && (
        <Step2Interview interviewData = {interviewData}
        onFinish = {(report)=>navigate(`/report/${report.interviewId}`)} />
)}

    </div>
  )
}

export default InterviewPage
