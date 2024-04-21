const crypto = require("crypto");
// Repo
const creditReasonRepo = require("../repository/CreditReasonRepo");

async function getCreditReason(userID) {
    return (await creditReasonRepo.getCreditReason(userID));
}

async function getAllCreditReasonByUserId(userId){
    return (await creditReasonRepo.getAllCreditReasonByUserId(userId));
}

async function addCreditReason(creditReasonObj) {
    creditReasonObj.id = crypto.randomBytes(10).toString("hex");
    creditReasonRepo.saveCreditReason(creditReasonObj);
    
    return creditReasonObj.id;
}

module.exports = { getCreditReason, addCreditReason, getAllCreditReasonByUserId }