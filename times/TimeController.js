import TimeService from './TimeService.js';
import Task from '../tasks/Task.js';
import HystoryFields from '../hystory/HystoryFields.js';
import Hystory from '../hystory/Hystory.js';

class TimeController {
    async editeTime(req, res) {
        try {
            let payload = req.body

            Task.findById(payload.taskId).exec(function (error) {
                if (error) {
                    return res.status(500).json({ message: 'Такой задачи не существует' })
                }
            });

            const authorAuth = req.user._id

            const taskBD = await Task.findById(payload.taskId)

            if (taskBD.executor !== authorAuth) {
                return res.status(500).json({ message: 'Списывать время может только executor' })
            }
            
            if (Number.isInteger(payload.time) && Math.sign(payload.time) !== -1) {
                if (taskBD.time) {
                    taskBD.time += payload.time
                } else {
                    taskBD.time = payload.time
                }

                let fieldsEdited = Object.keys(payload)

                let hystoryChanges = HystoryFields.map((field) => {
                    const nameField = field

                    if (fieldsEdited.indexOf(field) !== -1) {
                        return {
                            taskId: payload.taskId,
                            field: nameField,
                            author: authorAuth,
                            newValue: payload[field],
                        }
                    }

                })

                const filteredHystoryChanges = hystoryChanges.filter((el) => el !== undefined);

                await Hystory.create(filteredHystoryChanges)

                const editTime = await TimeService.editeTime(taskBD)
                return res.json(editTime)
            } else {
                return res.status(500).json({ message: 'time должно быть положительным числом' })
            }
            
        }
        catch (e) {
            res.status(500).json(e.message)
        }
    }
}

export default new TimeController()