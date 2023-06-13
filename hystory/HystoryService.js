import Hystory from '../hystory/Hystory.js';

const excludeFilelds = {
    __v: false,
}

class Hystoryservice {
    async getHystory(taskId) {
        const hystory = await Hystory.find({}, excludeFilelds)
        const hystoryFiltered = hystory.filter(x => x.taskId === taskId)
        
        return hystoryFiltered

    }

}

export default new Hystoryservice()