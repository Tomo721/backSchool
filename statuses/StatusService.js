class StatusService {
   
    getStatuses() {
        
        return [
            "DRAFT",
            "IN_PROCESS",
            "COMPLETED",
            "TESTING",
            "TESTING_DONE",
            "CLOSED",
            "DELETED"
        ]
    }
    
}

export default new StatusService()