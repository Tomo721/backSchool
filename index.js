import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import router from './router.js';
import fileUpload from 'express-fileupload'

const PORT = process.env.PORT || 8081;
const DB_URL = 'mongodb+srv://admin:admin@cluster1.3pbsl0a.mongodb.net/?retryWrites=true&w=majority';

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('static'))
app.use(fileUpload({}))
app.use('/api', router)
// app.use('/users', userRouter)


// app.get('/', (req, res) => {
//     console.log('req.query', req.query);
//     res.status(200).json('работает')
// })



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