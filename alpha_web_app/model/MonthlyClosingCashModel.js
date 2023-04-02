const monthlyClosingCash = class {
    constructor(id,monthId,amount,year){
        this.id = id;
        this.monthId = monthId;
        this.amount = amount;
        this.year = year;
    }
}

module.exports = monthlyClosingCash;