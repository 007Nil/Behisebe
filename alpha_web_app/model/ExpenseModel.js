const Expense = class {
    constructor(id,bankID,userID,lendID,reason,date,notes,amount){
        self.id = id;
        self.bankID = bankID;
        self.userID = userID;
        self.lendID = lendID;
        self.reason = reason;
        self.date = date;
        self.notes = notes;
        self.amount = amount;
    }
}

module.exports = Expense;