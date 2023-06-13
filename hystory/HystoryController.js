import HystoryService from './HystoryService.js';

class HystoryController {
    async getHystory(req, res) {
        try {
            const hystory = await HystoryService.getHystory(req.params.id)
            return res.json(hystory)
        }
        catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new HystoryController()