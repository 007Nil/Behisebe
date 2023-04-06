// ID VARCHAR(255) NOT NULL UNIQUE,
// MonthId INT NOT NULL,
// Amount INT NOT NULL,
// Year VARCHAR(20),
// BankId VARCHAR(255) NOT NULL,

const monthlyClosing = class {
    constructor(id,monthId,amount,year,bankId,userId){
        this.id = id;
        this.monthId = monthId;
        this.amount = amount;
        this.bankId = bankId;
        this.year = year;
        this.userId = userId;
    }
}

module.exports = monthlyClosing;