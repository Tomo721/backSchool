import Comment from './Comment.js';
import Task from '../tasks/Task.js';

const excludeFilelds = {
    __v: false,
}

class Commentservice {
    async createComment(comment) {
        const createdComment = await Comment.create(comment)
        return createdComment;
    }
    async editeComment(comment) {
        if (!comment._id) {
            throw new Error('id не указан')
        }
        if (comment.dateCreated) {
            throw new Error('dateCreated изменять нельзя')
        }
        
        const updatedComment = await Comment.findByIdAndUpdate(comment._id, comment, { new: true })
        return updatedComment

    }
    async getComments(taskId) {
        const task = await Task.findById(taskId, excludeFilelds).exec()
        let comments = await Comment.find({}, excludeFilelds)
        
        if (task) {
            const commentsFiltered = comments.filter(x => x.taskId === taskId)
            return commentsFiltered
        } else {
            return { message: 'Задачи с таким id не существует' }
        }

    }
    async getCommentsBeforeDelete(taskId) {
        let comments = await Comment.findById(taskId, excludeFilelds).exec()

        if (comments) {
            return comments
        } else {
            return { message: 'Комментария с таким id не существует' }
        }

    }
    async deleteComment(id) {
        const comment = await Comment.findByIdAndDelete(id)
        return comment
    }
}

export default new Commentservice()