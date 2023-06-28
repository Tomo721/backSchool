import mongoose from 'mongoose'

const Hystory = new mongoose.Schema({
    taskId: {
        type: String,
        required: true
    },
    field: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    // oldValue: {
    //     type: String,
    //     default: null
    // },
    newValue: {
        type: String,
        default: ''
    },
    dateEdited: {
        type: String, 
        default: new Date().toISOString()
    },
});

export default mongoose.model('Hystory', Hystory)