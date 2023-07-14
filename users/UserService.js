import User from './User.js';
import fileService from '../fileService.js';
import bcrypt from 'bcryptjs';

const excludeFilelds = {
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
        if (user.picture) {
            throw new Error('picture изменять нельзя')
        }

        const updatedUser = await User.findByIdAndUpdate(user._id, user, { new: true, select: '-password -__v' })
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
        if (user.picture) {
            throw new Error('picture изменять нельзя')
        }
        user.password = bcrypt.hashSync(user.password, 3)

        const updatedUserPassword = await User.findByIdAndUpdate(user._id, user, { new: true, select: '-password -__v'})
        return updatedUserPassword

    }
    async updateStatus(user, isAdmin) {
        if (!user._id) {
            throw new Error('id не указан')
        }
        if (user.login) {
            throw new Error('login изменять нельзя')
        }
        if (user.password) {
            throw new Error('password изменять нельзя')
        }
        if (user.picture) {
            throw new Error('picture изменять нельзя')
        }
        if (!isAdmin) {
            throw new Error('Только ADMIN может изменить статус пользователя')
        }
        
        const updatedUserStatus = await User.findByIdAndUpdate(user._id, user, { new: true, select: '-password -__v' })
        return updatedUserStatus
    }
    async updatePicture(user, picture) {
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

        if (picture && typeof picture === 'string') {
            user.picture = picture
        } else if (!picture) {
            user.picture = null
        } else {
            const fileName = picture ? fileService.saveFile(picture) : null
            user.picture = fileName
        }

        const updatedUserPicture = await User.findByIdAndUpdate(user._id, user, { new: true, select: '-password -__v' })
        return updatedUserPicture

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

        let filters = []

        if (dto.filter && dto.filter.name) {
            dto.filter._id = null
            filters.push(
                { name: { $regex: dto.filter.name, $options: "i" } },
            )
        }
        // if (dto.filter && dto.filter._id && dto.filter._id.length !== 0) {
        //     filters.push(
        //         { _id: dto.filter._id },
        //     )
        // }
        if (dto.filter && dto.filter._id) {
            filters.push(
                { _id: dto.filter._id },
            )
        }

        const skip = (page - 1) * 10
        let users;
        let sortUsers = 1;

        if (dto.sort) {
            sortUsers = dto.sort === 'desc' ? -1 : 1
        }

        
        if (filters.length !== 0) {
            
            if (dto.filter.name) {
                users = await User.find(
                    { $or: filters }, excludeFilelds
                ).skip(skip).limit(limit).sort({ "name": sortUsers })
            }
            if (dto.filter._id) {
                if (dto.filter._id.length !== 0) {
                    let usersSearchId = await User.find({ $and: filters }, excludeFilelds)
                    users = usersSearchId
                    
                } else {
                    let userSearchId = await User.findById(dto.filter._id, excludeFilelds)
                    users = [userSearchId]

                }
            }
        } else {
            users = await User.find({}, excludeFilelds).skip(skip).limit(limit).sort({ "name": sortUsers })
        }
        let usersAll = []

        if (filters.length !== 0) {
            usersAll = await User.find({ $or: filters }, excludeFilelds)
        } else {
            usersAll = await User.find()
        }
        let total = Math.floor(usersAll.length / limit);

        if (usersAll.length % limit >= 1) {
            total++;
        };

        if (dto.filter && dto.filter._id) {
            total = 1
        }
        
        return { page, limit, total, users }

    }
    async getCurrentUser(id) {
        const user = await User.findById(id, excludeFilelds).exec()
        return user
    }
}

export default new UserService()