import Hystory from '../hystory/Hystory.js';

const excludeFilelds = {
    __v: false,
}

class Hystoryservice {
    async getHystory() {
        const hystory = await Hystory.find({}, excludeFilelds)
        return { hystory }

    }

}

export default new Hystoryservice()