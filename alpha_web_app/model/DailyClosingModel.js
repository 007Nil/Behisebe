const dailyCloisng = class {
    constructor(id,date,amount,bankId, userId,isCredit){
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.bankId = bankId;
        this.userId = userId;
        this.isCredit = isCredit;
    }
}

module.exports = dailyCloisng;
