import mongoose from 'mongoose'

const Task = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength: [3, 'Название слишком короткое'],
        maxLength: [256, 'Название слишком длинное']
    },
    description: {
        type: String,
        required: true,
        maxLength: [2048, 'Описание слишком длинное']
    },
    projectId: { type: String, required: true },
    number: { type: String },
    status: { type: String, default: 'DRAFT' },
    author: { type: String, default: null },
    authorEdited: { type: String, default: null },
    dateCreated: { type: String, default: new Date().toISOString().split('T')[0] },
    dateEdited: { type: String, default: null },
    executor: { type: String, default: null },
    time: { type: Number, default: null },
})


export default mongoose.model('Task', Task)