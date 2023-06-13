import mongoose from 'mongoose'

const Time = new mongoose.Schema({
    taskId: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    },
});

export default mongoose.model('Time', Time)