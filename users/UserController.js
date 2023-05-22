import UserService from './UserService.js';

class UserController {
    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body)
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
    async getUsers(req, res) {
        try {
            const posts = await UserService.getUsers()
            return res.json(posts)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async getUser(req, res) {
        try {
            const user = await UserService.getUser(req.params.id)
            return res.json(user)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new UserController()