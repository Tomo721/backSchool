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

            if (req.user.roles.indexOf('ADMIN') !== -1) {
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
    async updatePicture(req, res) {
        try {
            const userBD = await UserService.getCurrentUser(req.body._id)
            const userBDPicture = userBD.picture ? userBD.picture : null

            let picture = req.files ? req.files.picture : userBDPicture

            if (req.body.picture) {
                picture = null
            }

            const updatedUserPicture = await UserService.updatePicture(req.body, picture)
            return res.json(updatedUserPicture)
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
    async getCurrentUser(req, res) {
        try {
            const user = await UserService.getCurrentUser(req.user.id)
            return res.json(user)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()