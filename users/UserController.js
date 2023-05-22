import UserService from './UserService.js';

class UserController {
   
    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body, req.files.picture)
            res.json(user)
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
    async getUsers(req, res) {
        try {
            const { page, limit } = req.query

            const users = await UserService.getUsers(page, limit)
            return res.json(users)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async getUser(req, res) {
        try {
            const user = await UserService.getUser(req.params.name)
            return res.json(user)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()