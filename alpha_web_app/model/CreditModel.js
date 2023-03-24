const Credit = class {
    constructor(creditID,bankId,userId,lendId,reason,date,amount,notes){
        self.creditID = creditID;
        self.bankId = bankId;
        self.userId = userId;
        self.lendId = lendId;
        self.reason = reason;
        self.date = date;
        self.amount = amount;
        self.notes   = notes;
    }
}

module.exports = Credit;