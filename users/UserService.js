import User from './User.js';
import fileService from '../fileService.js';

const excludeFilelds = {
    login: false,
    password: false, 
    __v: false,
}

class UserService {
    async createUser(user, picture) {
        const fileName = picture ? fileService.saveFile(picture) : null
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
    async getUsers(dto, page, limit) {
        if (!dto.page) {
            page = 1
        } else {
            page = parseInt(dto.page)
        }

        if (!dto.limit) {
            limit = 10
        } else {
            limit = parseInt(dto.limit)
        }

        const skip = (page - 1) * 10

        if (!dto.filter.name) {
            throw new Error('name не указан')
        }

        const users = await User.find({ name: { $regex: dto.filter.name, $options: "i" }},
            excludeFilelds).skip(skip).limit(limit)


        return { page, limit, users }


    }
    async getUser(id) {
        
        if (!id) {
            throw new Error('id не указан')
        }
        const user = await User.findById({}, excludeFilelds).exec()
        // const user = await User.findOne({ "id": id }, excludeFilelds).exec()

        return user
    }
}

export default new UserService()