import Comment from './Comment.js';

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
        if (comment.dataCreated) {
            throw new Error('dataCreated изменять нельзя')
        }
        
        const updatedComment = await Comment.findByIdAndUpdate(comment._id, comment, { new: true })
        return updatedComment

    }
    async getComments(dto) {
        let Comments;
        
        Comments = await Comment.find({}, excludeFilelds)
        
        return { Comments }
    }
    async deleteComment(id) {
        if (!id) {
            throw new Error('id не указан')
        }
        const comment = await Comment.findByIdAndDelete(id)
        return comment

    }
}

export default new Commentservice()