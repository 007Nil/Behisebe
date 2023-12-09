const Expense = class {
    constructor(id,bankId,userId,byCash,lendId,reason,date,notes,amount,lendClose){
        this.id = id;
        this.bankId = bankId;
        this.userId = userId;
        this.byCash = byCash;
        this.lendId = lendId;
        this.reason = reason;
        this.date = date;
        this.notes = notes;
        this.amount = amount;
        this.lendClose = lendClose;
    }
}

module.exports = Expense;