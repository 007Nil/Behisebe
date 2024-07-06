import { getAllCreditReasonDetails, saveCreditReason } from "../repositories/CreditReasonRepo";

async function getCreditReason(){
    return getAllCreditReasonDetails
}

async function saveCreditReasonService(credirObject){
    await saveCreditReason(credirObject);
    return;
}

export {getCreditReason, saveCreditReasonService}