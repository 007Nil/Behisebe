const Lend = class {
    constructor(
        id,
        lendTo,
        lendFrom,
        fullPayment,
        partialPaymentID,
        paymentOnDate,
        userID
    ){
        this.id = id;
        this.lendTo = lendTo;
        this,lendFrom = lendFrom;
        this.fullPayment = fullPayment;
        this.partialPaymentID = partialPaymentID;
        this.paymentOnDate = paymentOnDate;
        this.userID = userID;
    }
}

module.exports = Lend;