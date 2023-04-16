const pertialPayment = class {
    constructor(id,onDate,lendId,amount,bankId,bycash){
        this.id = id;
        this.onDate = onDate;
        this.lendId = lendId;
        this.amount = amount;
        this.bankId = bankId;
        this.bycash = bycash;
    }
}

module.exports = pertialPayment;