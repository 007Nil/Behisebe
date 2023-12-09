const Credit = class {
    constructor(creditId,bankId,userId,byCash,lendId,reason,date,amount,notes,lendPaid){
        this.creditId = creditId;
        this.bankId = bankId;
        this.userId = userId;
        this.byCash = byCash;
        this.lendId = lendId;
        this.reason = reason;
        this.date = date;
        this.amount = amount;
        this.notes   = notes;
        this.lendPaid = lendPaid;
    }
}

module.exports = Credit;