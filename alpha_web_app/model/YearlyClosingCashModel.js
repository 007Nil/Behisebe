// ID VARCHAR(255) NOT NULL UNIQUE,
// Amount INT NOT NULL,
// Year VARCHAR(20),

const yearlyClosingCash =  class {
    constructor(id,amount,year){
        this.id = id;
        this.amount = amount;
        this.year = year;
    }
}

module.exports = yearlyClosingCash;