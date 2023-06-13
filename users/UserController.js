import UserService from './UserService.js';

class UserController {
   
    async createUser(req, res) {
        try {
            const picture = req.files ? req.files.picture : null
            const user = await UserService.createUser(req.body, picture)
            
            return user
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async updateUser(req, res) {
        try {
            const updatedUser = await UserService.updateUser(req.body)
            return res.json(updatedUser)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
    async updatePassword(req, res) {
        try {
            const updatedUserPassword = await UserService.updatePassword(req.body)
            return res.json(updatedUserPassword)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
    async updateStatus(req, res) {
        try {
            let isAdmin;

            if (req.session.user.roles.indexOf('ADMIN') !== -1) {
                isAdmin = true
            } else {
                isAdmin = false
            }

            const updatedUserStatus = await UserService.updateStatus(req.body, isAdmin)
            return res.json(updatedUserStatus)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers(req.body)
            return res.json(users)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    // async getUser(req, res) {
    //     try {
    //         const user = await UserService.getUser(req.params.id)
    //         return res.json(user)
    //     }
    //     catch (e) {
    //         res.status(500).json(e)
    //     }
    // }
}

export default new UserController()