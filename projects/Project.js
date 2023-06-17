import mongoose from 'mongoose'

const Project = new mongoose.Schema({
    name: { type: String, maxLength: [256, 'Название слишком длинное'], required: true },
    code: { type: String, maxLength: [64, 'Код слишком длинный'], required: true },
    author: { type: String, default: null },
    authorEdited: { type: String, default: null },
    dataCreated: { type: String, default: new Date().toISOString().split('T')[0] },
    dataEdited: { type: String, default: null },

})

export default mongoose.model('Project', Project)