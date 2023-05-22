import User from './User.js';
import fileService from '../fileService.js';

const excludeFilelds = {
    login: false,
    password: false, 
    __v: false,
}

class UserService {
    // async create(post, picture) {
    //     const fileName = fileService.saveFile(picture)
    //     const createdPost = await Post.create({...post, picture: fileName})
    //     return createdPost;
        
    // }
    async createUser(user, picture) {
        const fileName = fileService.saveFile(picture)
        const createdUser = await User.create({ ...user, picture: fileName })
        return createdUser;
    }
    async updateUser(user) {
        if (!user._id) {
            throw new Error('id не указан')
        }
        if (user.login) {
            throw new Error('login изменять нельзя')
        }
        if (user.password) {
            throw new Error('password изменять нельзя')
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true })
        return updatedUser

    }
    async updatePassword(user) {
        if (!user._id) {
            throw new Error('id не указан')
        }
        if (user.login) {
            throw new Error('login изменять нельзя')
        }
        const updatedUserPassword = await User.findByIdAndUpdate(user._id, user, { new: true })
        return updatedUserPassword

    }
    async getUsers(page, limit) {
        if(!page) {
            page = 1
        }
        if (!limit) {
            limit = 10
        }
        const skip = (page - 1) * 10
        const users = await User.find({}, excludeFilelds).skip(skip).limit(limit)
        return {page, limit, users}
    }
    async getUser(name) {
        
        if (!name) {
            throw new Error('name не указан')
        }
        const user = await User.findOne({ "name": name }, excludeFilelds).exec()

        return user
    }
}

export default new UserService()