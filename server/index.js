import express from 'express'
import dotenv from "dotenv"
import connectDb from "./config/connectDb.js"
import cookieParser from 'cookie-parser'
import cors from "cors"
import authRouter from './routes/auth.route.js'
import userRouter from './routes/user.route.js'
import interviewRouter from './routes/interview.route.js'
import paymentRouter from './routes/payment.route.js'

dotenv.config()

const app = express()
app.set('trust proxy', 1)

const allowedOrigins = [
    'http://localhost:5173',
    'https://ai-interview-client23.onrender.com',
    'https://ai-iq-interview-1.onrender.com'
]

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
            return
        }
        callback(new Error('Not allowed by CORS'))
    },
    credentials: true
}))

// Allow popups from the client (reduces Cross-Origin-Opener-Policy warnings)
app.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
    next()
})


const PORT = process.env.PORT || 6000


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/user",userRouter)
app.use("/api/interview",interviewRouter)
app.use("/api/payment",paymentRouter)


app.get("/",(req,res)=>{
    return res.json({message:"server started"})
})

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
    connectDb()
})
