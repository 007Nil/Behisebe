const crypto = require("crypto");

// Repos
const partialPaymentRepo = require("../repository/PartialPaymemntRepo");

async function getPartialPayment(lendId){
    return partialPaymentRepo.getPartialPayment(lendId);
}

async function savePartialPayment(partialPaymentObj){
    partialPaymentObj.id = crypto.randomBytes(10).toString("hex");
    await partialPaymentRepo.savePartialPayment(partialPaymentObj);
}
module.exports = {
    getPartialPayment,
    savePartialPayment
}