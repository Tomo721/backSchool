import UserController from '../users/UserController.js';
import User from '../users/User.js';
import Role from './Role.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import settings from '../config.js';

const generateAccessToken = (id, roles) => {
    const dto = {id, roles}

    return jwt.sign(dto, settings.secret, {expiresIn: '24h'})
}

class AuthController {
    async registration(req, res) {
        try {
            const {login, password} = req.body
            const candidate = await User.findOne({login})

            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
            }

            const hashPassword = bcrypt.hashSync(password, 3)
            const userRole = await Role.findOne({value: "ADMIN"})

            req.body.password = hashPassword
            req.body.roles = [userRole.value]

            await UserController.createUser(req)
            res.json('Пользователь зарегистрирован')
        }
        catch (e) {
            console.log('registration error', e)
        }
    }
    async login(req, res) {
        try {
            const {login, password} = req.body
            const user = await User.findOne({ login })

            if (!user) {
                return res.status(400).json({ message: `Пользователя ${login} не существует` })
            }

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({ message: `Введен неверный пароль` })
            }

            req.session.user = user
            
            const token = generateAccessToken(user._id, user.roles)
            return res.json({token})
        }
        catch (e) {
            console.log('login error', e)
            res.status(400).json({ message: 'Login error' })
        }
    }
}

export default new AuthController()