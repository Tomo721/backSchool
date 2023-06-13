import CommentService from './CommentService.js';
import Comment from './Comment.js';
import Task from '../tasks/Task.js';

class CommentController {
   
    async createComment(req, res) {
        try {
            const authorAuth = req.session.user._id
            req.body.author = authorAuth

            Task.findById(req.body.taskId).exec(function (error) {
                if (error) {
                    return res.status(500).json({ message: 'Такой задачи не существует' })
                }
            });
            
            const comment = await CommentService.createComment(req.body)
            res.json(comment)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async editeComment(req, res) {
        try {
            Task.findById(req.body.taskId).exec(function (error) {
                if (error) {
                    return res.status(500).json({ message: 'Такой задачи не существует' })
                }
            });
            const authorAuth = req.session.user._id
            req.body.author = authorAuth
            req.body.authorEdited = authorAuth
            req.body.dataEdited = new Date()

            const commentBD = await Comment.findById(req.body._id)

            if (commentBD.author !== authorAuth) {
                return res.status(500).json({ message: 'Можно редактировать только свои комментарии' })
            }

            const editComment = await CommentService.editeComment(req.body)
            return res.json(editComment)
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
    async getComments(req, res) {
        try {
            const Comments = await CommentService.getComments(req.body)
            return res.json(Comments)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteComment(req, res) {
        try {
            if (req.session.user.roles.indexOf('ADMIN') !== -1) {
                const comment = await CommentService.deleteComment(req.params.id)
                return res.json(comment)
            } else {
                return res.status(500).json({ message: 'Только ADMIN может удалять комментарии' })
            }
            
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new CommentController()