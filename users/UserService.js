import User from './User.js';

const excludeFilelds = {
    login: false,
    password: false, 
    __v: false,
}

class UserService {
    async createUser(user) {
        const createdUser = await User.create(user)
        return createdUser;
    }
    async updateUser(user) {
        if (!user._id) {
            throw new Error('id не указан')
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true })
        return updatedUser

    }
    async getUsers() {
        const user = await User.find({}, excludeFilelds).exec()
        return user

    }
    async getUser(id) {
        if (!id) {
            throw new Error('id не указан')
        } 
        const user = await User.findById(id, excludeFilelds).exec()

        return user
    }
}

export default new UserService()