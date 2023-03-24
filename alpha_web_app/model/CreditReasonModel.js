const CreditReason = class {
    constructor(id,reason,userId){
        self.id = id;
        self.reason = reason;
        self.userId = userId;
    }
}

module.exports = CreditReason;