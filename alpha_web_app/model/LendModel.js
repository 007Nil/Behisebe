const Lend = class {
    constructor(
        id,
        lendTo,
        lendFrom,
        fullPayment,
        // partialPaymentID,
        paymentOnDate,
        userId
    ){
        this.id = id;
        this.lendTo = lendTo;
        this,lendFrom = lendFrom;
        this.fullPayment = fullPayment;
        // this.partialPaymentID = partialPaymentID;
        this.paymentOnDate = paymentOnDate;
        this.userId = userId;
    }
}

module.exports = Lend;