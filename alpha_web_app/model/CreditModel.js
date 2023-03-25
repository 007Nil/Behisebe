const Credit = class {
    constructor(creditId,bankId,userId,lendId,reason,date,amount,notes){
        this.creditId = creditId;
        this.bankId = bankId;
        this.userId = userId;
        this.lendId = lendId;
        this.reason = reason;
        this.date = date;
        this.amount = amount;
        this.notes   = notes;
    }
}

module.exports = Credit;