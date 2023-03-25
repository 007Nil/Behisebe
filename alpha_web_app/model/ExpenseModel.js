const Expense = class {
    constructor(id,bankID,userID,lendID,reason,date,notes,amount){
        this.id = id;
        this.bankID = bankID;
        this.userID = userID;
        this.lendID = lendID;
        this.reason = reason;
        this.date = date;
        this.notes = notes;
        this.amount = amount;
    }
}

module.exports = Expense;