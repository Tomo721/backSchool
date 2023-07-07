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

        // if (dto.filter && dto.filter.dateEnd) {
        //     dto.filter.dateEnd = new Date(dto.filter.dateEnd)
        //     dto.filter.dateEnd.setDate(dto.filter.dateEnd.getDate() + 1);
        // }
        
        let filters = []

        for (let key in dto.filter) {
            if (key === 'name' && dto.filter[key]) {
                filters.push({ [key]: { $regex: dto.filter[key], $options: "i" } })
            }
            if (key === 'status' && dto.filter[key].length !== 0 ) {
                filters.push({ [key]: dto.filter[key] })
            }
            if (dto.filter[key] && key === 'author' || dto.filter[key] && key === 'executor' || dto.filter[key] && key === 'projectId') {
                filters.push({ [key]: dto.filter[key] })
            }
            
            if (dto.filter.dateStart && dto.filter.dateEnd) {
                filters.push({
                    dateCreated: {
                        $gte: new Date(dto.filter.dateStart).toISOString(),
                        $lte: new Date(dto.filter.dateEnd).toISOString()
                    }
                })
            } else if (dto.filter.dateStart && !dto.filter.dateEnd) {
                filters.push({
                    dateCreated: {
                        $gte: new Date(dto.filter.dateStart).toISOString()
                    }
                })
            } else if (!dto.filter.dateStart && dto.filter.dateEnd) {
                filters.push({
                    dateCreated: {
                        $lte: new Date(dto.filter.dateEnd).toISOString()
                    }
                })
            }
        }
        
        if (!dto.filter) {
            tasks = await Task.find({}, excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {})
        } else {
            tasks = await Task.find(
                { $and: filters },
                excludeFilelds).skip(skip).limit(limit).sort(sortField ? { [sortField]: sortType } : {}
            )
        }

        let taskAll = []

        if (dto.filter) {
            taskAll = await Task.find({ $and: filters }, excludeFilelds)
        } else {
            taskAll = await Task.find()
        }

        let total = Math.floor(taskAll.length / limit);

        if (taskAll.length % limit >= 1) {
            total++;
        };

        return { page, limit, total, tasks }
        

    }
    async getTask(id) {
        const task = await Task.findById(id, excludeFilelds).exec()

        if (task) {
            return task
        } else {
            return { message: 'Задачи с таким id не существует' }
        }

    }
    // async getTaskProject(id) {
    //     const task = await Task.find({ id }, excludeFilelds).exec()

    //     if (task) {
    //         return task
    //     } else {
    //         return { message: 'Задачи с таким id не существует' }
    //     }

    // }
    async deleteTask(id) {
        const task = await Task.findByIdAndDelete(id)
        return task

    }
}

export default new Taskservice()