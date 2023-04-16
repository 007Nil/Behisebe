const Lend = class {
    constructor(
        id,
        lendTo,
        lendFrom,
        fullPayment,
        paymentOnDate,
        userId,
        amount,
        partialAmount,
    ) {
        this.id = id;
        this.lendTo = lendTo;
        this, lendFrom = lendFrom;
        this.fullPayment = fullPayment;
        this.paymentOnDate = paymentOnDate;
        this.userId = userId;
        this.amount = amount;
        this.partialAmount = partialAmount;
    }
}

module.exports = Lend;