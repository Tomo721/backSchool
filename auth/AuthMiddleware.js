import jwt from 'jsonwebtoken';
import settings from '../config.js';

class AuthMiddleware {

    async AuthUserCheck(req, res, next) {
        try {
            const token = req.headers.authorization.split(' ')[1]

            if(!token) {
                return res.status(401).json({ message: 'Пользователь не авторизован' })
            }
            const decodedData = jwt.verify(token, settings.secret)
            req.user = decodedData

            next()
        }
        catch (e) {
            console.log('AuthUserCheck error', e)
            return res.status(401).json({message: 'Пользователь не авторизован'})
        }
    }
}

export default new AuthMiddleware()