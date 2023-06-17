import mongoose from 'mongoose'

const Comment = new mongoose.Schema({
    taskId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        maxLength: [1024, 'Название слишком длинное'],
        required: true
    },
    parentId: {
        type: String,
        default: null
    },
    author: {
        type: String,
        default: null
    },
    authorEdited: {
        type: String,
        default: null
    },
    dataCreated: {
        type: String,
        default: new Date().toISOString().split('T')[0]
    },
    dataEdited: {
        type: String,
        default: null
    },
});

export default mongoose.model('Comment', Comment)