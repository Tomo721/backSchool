import Task from './Task.js';

const excludeFilelds = {
    __v: false,
}

class Taskservice {
    async createTask(task) {
        const createdTask = await Task.create(task)
        return createdTask;
    }
    async editeTask(task) {
        console.log('task', task)
        if (!task._id) {
            throw new Error('id не указан')
        }
        if (!task.dataEdited) {
            throw new Error('dataEdited не указан')
        }
        
        // после авторизации сделать проверку на автора ???

        const updatedTask = await Task.findByIdAndUpdate(task._id, task, { new: true })
        return updatedTask

    }
    async getTasks(dto, page, limit) {
        if (!dto.page) {
            page = 1
        } else {
            page = parseInt(dto.page)
        }

        if (!dto.limit) {
            limit = 10
        } else {
            limit = parseInt(dto.limit)
        }

        const skip = (page - 1) * 10
        let tasks; 

        if (!dto.filter) {
            tasks = await Task.find({}, excludeFilelds).skip(skip).limit(limit)
        } else {
            tasks = await Task.find(
                {
                    $or: [
                        { name: dto.filter.name ? { $regex: dto.filter.name, $options: "i" } : '' },
                        { author: dto.filter.author ? dto.filter.author : '' },
                        { status: dto.filter.status ? dto.filter.status : '' },
                        { executor: dto.filter.executor ? dto.filter.executor : '' },
                    ],
                    // dataCreated: {
                    //     $gt: ISODate(dto.filter.dateStart),
                    //     $lt: ISODate(dto.filter.dateEnd)
                    // }
                },
                excludeFilelds).skip(skip).limit(limit)
        }

        
        return { page, limit, tasks }
        

    }
    async getTask(id) {

        if (!id) {
            throw new Error('id не указан')
        }
        const task = await Task.findById({}, excludeFilelds).exec()

        return task
    }
    async deleteTask(id) {
        if (!id) {
            throw new Error('id не указан')
        }
        const task = await Task.findByIdAndDelete(id)
        return task

    }
}

export default new Taskservice()