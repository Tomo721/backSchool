import mongoose from 'mongoose'

const User = new mongoose.Schema({
    name: { type: String, required: true },
    login: { type: String},
    password: { type: String },
    description: { type: String, default: null },
    picture: { type: String, default: null },

})

export default mongoose.model('User', User)