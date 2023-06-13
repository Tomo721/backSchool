import mongoose from 'mongoose'

const User = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    login: { type: String, unique: true },
    password: { type: String },
    roles: [{type: String, ref: 'Role'}],
    description: { type: String, default: null },
    picture: { type: String, default: null },
    status: { type: String, default: 'ACTIVE' } // ACTIVE, BLOCKED, DELETED
})

export default mongoose.model('User', User)