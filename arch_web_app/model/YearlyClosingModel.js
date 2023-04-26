const yearlyClosing = class {
    constructor(id,amount,year,bankId,userId){
        this.id = id;
        this.amount = amount;
        this.year = year;
        this.bankId = bankId;
        this.userId = userId;
    }
}

module.exports = yearlyClosing;