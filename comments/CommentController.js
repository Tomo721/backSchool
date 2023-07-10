import CommentService from './CommentService.js';
import Comment from './Comment.js';
import Task from '../tasks/Task.js';
import mongoose from 'mongoose'

class CommentController {
   
    async createComment(req, res) {
        try {
            const authorAuth = req.user.id
            req.body.author = authorAuth
            req.body.dateCreated = new Date().toISOString()

            Task.findById(req.body.taskId).exec(function(error, task) {
                if (error) {
                    return res.status(500).json({ message: 'Такой задачи не существует' })
                }
            });

            if (req.body.parentId) {
                let comments = await Comment.find()
                const commentsFiltered = comments.filter(x => x.taskId == req.body.taskId)
                
                if (commentsFiltered.length !== 0) {
                    let commentParent = commentsFiltered.filter(x => x._id == req.body.parentId)

                    if (!commentParent || commentParent.length === 0) {
                        return res.status(500).json({ message: 'Такого комментария нет в этой задаче, укажите верный parentId' })
                    }
                }

            }
            
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

            const commentBD = await Comment.findById(req.body._id)

            const authorAuth = req.user.id
            req.body.author = commentBD.author
            req.body.authorEdited = authorAuth
            req.body.dateEdited = new Date().toISOString()

            let isAdmin;

            if (req.user.roles.indexOf('ADMIN') !== -1) {
                isAdmin = true
            } else {
                isAdmin = false
            }

            if (commentBD.author !== authorAuth && !isAdmin) {
                return res.status(500).json({ message: 'Можно редактировать только свои комментарии' })
            }

            if (req.body.parentId) {
                let comments = await Comment.find()
                const commentsFiltered = comments.filter(x => x.taskId == req.body.taskId)

                if (commentsFiltered.length !== 0) {
                    let commentParent = commentsFiltered.filter(x => x._id == req.body.parentId)
                    if (!commentParent || commentParent.length === 0) {
                        return res.status(500).json({ message: 'Такого комментария нет в этой задаче, укажите верный parentId' })
                    }
                }

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
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const comments = await CommentService.getComments(req.params.id)
                
                if (!comments.message) {
                    return res.json(comments)
                } else {
                    return res.status(400).json(comments)
                }
            } else {
                return res.status(400).json({ message: 'Неверный формат id' })
            }
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
    async deleteComment(req, res) {
        try {
            if (mongoose.Types.ObjectId.isValid(req.params.id)) {
                const comments = await CommentService.getCommentsBeforeDelete(req.params.id)

                if (comments.id) {
                    let isAdmin;

                    if (req.user.roles.indexOf('ADMIN') !== -1) {
                        isAdmin = true
                    } else {
                        isAdmin = false
                    }

                    const authorAuth = req.user.id
                    const commentBD = await Comment.findById(req.params.id)

                    if (commentBD.author === authorAuth || isAdmin) {
                        await CommentService.deleteComment(req.params.id)
                        return res.status(200).json({ message: `Комментарий удален` })
                    } else {
                        return res.status(500).json({ message: 'Можно удалять только свои комментарии' })
                    }

                    
                } else {
                    return res.status(400).json(comments)
                }
            } else {
                return res.status(400).json({ message: 'Неверный формат id' })
            }
            
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new CommentController()