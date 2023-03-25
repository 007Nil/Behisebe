const Expense = class {
    constructor(id,bankId,userId,lendId,reason,date,notes,amount){
        this.id = id;
        this.bankId = bankId;
        this.userId = userId;
        this.lendId = lendId;
        this.reason = reason;
        this.date = date;
        this.notes = notes;
        this.amount = amount;
    }
}

module.exports = Expense;