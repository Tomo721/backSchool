import StatusService from './StatusService.js';

class StatusController {
    async getStatuses(req, res) {
        try {
            const users = await StatusService.getStatuses()
            return res.json(users)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
   
}

export default new StatusController()