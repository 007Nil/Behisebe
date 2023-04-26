const dailyClosingCash = class {
    constructor(id,date,amount,userId,isCredit){
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.isCredit = isCredit;
        this.userId = userId;
    }
} 

module.exports = dailyClosingCash;