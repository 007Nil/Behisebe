const pertialPayment = class {
    constructor(id,onDate,lendId,amount){
        this.id = id;
        this.onDate = onDate;
        this.lendId = lendId;
        this.amount = amount;
    }
}

module.exports = pertialPayment;