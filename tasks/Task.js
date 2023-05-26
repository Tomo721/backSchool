import mongoose from 'mongoose'

const Comment = new mongoose.Schema({
    author: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    dataCreated: {
        type: String,
        required: true
    },
    dataEdited: {
        type: String,
        default: null
    },
});

const Task = new mongoose.Schema({
    name: { 
        type: String, 
        required: true, 
        minLength: [2, 'Название слишком короткое'], 
        maxLength: [256, 'Название слишком длинное']
    },
    description: { 
        type: String, 
        default: null,
        minLength: [2, 'Описание слишком короткое'],
        maxLength: [2048, 'Описание слишком длинное']
    },
    author: { type: String, required: true },
    dataCreated: { type: String, required: true },
    dataEdited: { type: String, default: null },
    executor: { type: String, default: null },
    time: { type: Number, default: null }, // уточнить как хранить
    status: { type: String, required: true },
    comments: { type: Array(Comment), default: null }
})

export default mongoose.model('Task', Task)