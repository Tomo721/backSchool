import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router.js'
import fileUpload from 'express-fileupload'
import session from 'express-session'
import cookieParser from 'cookie-parser'

const PORT = process.env.PORT || 8081;
const DB_URL = 'mongodb+srv://admin:admin@cluster1.3pbsl0a.mongodb.net/?retryWrites=true&w=majority';

const app = express()

app.use(cookieParser());

let secret = 'secretKey';

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
    }
}));

app.use(express.json())
app.use(cors())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)

async function startApp() {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(PORT, () => console.log('SERVER STARTED ' + PORT))
    }
    catch (e) {
        console.log('error startApp ', e)
    }
}

startApp()