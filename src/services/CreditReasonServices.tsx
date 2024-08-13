import { getAllCreditReasonDetails, saveCreditReason, updateCreditReasonDetails } from "../repositories/CreditReasonRepo";

async function getCreditReason(){
    return getAllCreditReasonDetails()
}

async function saveCreditReasonService(credirObject){
    await saveCreditReason(credirObject);
    return;
}

async function updateCreditReasonService(creditObj){
    await updateCreditReasonDetails(creditObj);
    return;
}

export {getCreditReason, saveCreditReasonService, updateCreditReasonService}