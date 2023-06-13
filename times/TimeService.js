import Task from '../tasks/Task.js';

class Timeservice {
    async editeTime(task) {
        const updatedTimeTask = await Task.findByIdAndUpdate(task._id, task, { new: true })
        return updatedTimeTask

    }
}

export default new Timeservice()