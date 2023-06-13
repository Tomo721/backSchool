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

        let sortField = null
        let sortType = 1

        if (dto.sort) {
            sortField = dto.sort.field
            sortType = dto.sort.type === 'desc' ? -1 : 1
        }

        if (dto.filter && dto.filter.dateEnd) {
            dto.filter.dateEnd = new Date(dto.filter.dateEnd)
            dto.filter.dateEnd.setDate(dto.filter.dateEnd.getDate() + 1);
        }
        
        if (!dto.filter) {
            tasks = await Task.find({}, excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {})
        } else {
            
            tasks = await Task.find(
                {
                    $or: [
                        { name: dto.filter.name ? { $regex: dto.filter.name, $options: "i" } : '' },
                        { author: dto.filter.author ? dto.filter.author : '' },
                        { status: dto.filter.status ? dto.filter.status : '' },
                        { executor: dto.filter.executor ? dto.filter.executor : '' },
                        { dataCreated: { $gte: new Date(dto.filter.dateStart), $lte: dto.filter.dateEnd }},
                    ],
                  
                },
                excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {})
        }

        return { page, limit, tasks }
        

    }
    async getTask(id) {

        if (!id) {
            throw new Error('id не указан')
        }
        const task = await Task.findById(id, excludeFilelds).exec()

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