import User from './User.js';
import fileService from '../fileService.js';
import bcrypt from 'bcryptjs';

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
        if (user.status) {
            throw new Error('status изменять нельзя')
        }
        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true, select: '-password -login -__v' })
        return updatedUser

    }
    async updatePassword(user) {
        if (!user._id) {
            throw new Error('id не указан')
        }
        if (user.login) {
            throw new Error('login изменять нельзя')
        }
        if (user.status) {
            throw new Error('status изменять нельзя')
        }
        user.password = bcrypt.hashSync(user.password, 3)
        console.log('user.password ', user.password)
            

        const updatedUserPassword = await User.findByIdAndUpdate(user._id, user, { new: true, select: '-password -login -__v'})
        return updatedUserPassword

    }
    async updateStatus(user, isAdmin) {
        if (!user._id) {
            throw new Error('id не указан')
        }
        if (user.login) {
            throw new Error('login изменять нельзя')
        }
        if (!isAdmin) {
            throw new Error('Только ADMIN может изменить статус пользователя')
        }
        
        const updatedUserStatus = await User.findByIdAndUpdate(user._id, user, { new: true, select: '-password -login -__v' })
        return updatedUserStatus

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
        let users;
        let sortUsers = 1;

        if (dto.sort) {
            sortUsers = dto.sort === 'desc' ? -1 : 1
        }

        if (dto.filter) {
            if (dto.filter.name) {
                users = await User.find(
                    { name: { $regex: dto.filter.name, $options: "i" } },
                    excludeFilelds
                ).skip(skip).limit(limit).sort({ "name": sortUsers })
            } else {
                users = await User.find({}, excludeFilelds).skip(skip).limit(limit).sort({ "name": sortUsers })
            }
        } else {
            users = await User.find({}, excludeFilelds).skip(skip).limit(limit)
        }

        const usersAll = await User.find()
        
        let total = Math.floor(usersAll.length / limit);

        if (usersAll.length % limit >= 1) {
            total++;
        };

        return { page, limit, total, users }


    }
    // async getUser(id) {
        
    //     if (!id) {
    //         throw new Error('id не указан')
    //     }
    //     const user = await User.findById({}, excludeFilelds).exec()
    //     // const user = await User.findOne({ "id": id }, excludeFilelds).exec()

    //     return user
    // }
}

export default new UserService()