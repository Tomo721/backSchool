import mongoose from 'mongoose'

const Project = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
    author: { type: String, required: true },
    dataCreated: { type: String, required: true },
    dataEdited: { type: String, default: null },

})

export default mongoose.model('Project', Project)