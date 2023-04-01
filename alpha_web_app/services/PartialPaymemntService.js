const crypto = require("crypto");

// Repos
const partialPaymentRepo = require("../repository/PartialPaymemntRepo");

async function getPartialPayment(lendId){
    return partialPaymentRepo.getPartialPayment(lendId);
}

module.exports = {
    getPartialPayment
}