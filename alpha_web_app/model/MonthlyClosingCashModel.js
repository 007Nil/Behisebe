const monthlyClosingCash = class {
    constructor(id,monthId,amount,year,userId){
        this.id = id;
        this.monthId = monthId;
        this.amount = amount;
        this.year = year;
        this.userId = userId;
    }
}

module.exports = monthlyClosingCash;