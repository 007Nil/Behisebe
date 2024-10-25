import { SQLiteRunResult } from "expo-sqlite";
import { CreditReasonModel } from "../model";
import { getAllCreditReasonDetails, addCreditReasonDetails, updateCreditReasonDetails } from "../repository/CreditDetailsRepo";

async function getAllCreditReasonDetailsService(): Promise<CreditReasonModel[]> {
    return await getAllCreditReasonDetails();
}

async function addCreditReasonService(creditReasonObj: CreditReasonModel) {
    let sqlResult: SQLiteRunResult = await addCreditReasonDetails(creditReasonObj);
    console.log(sqlResult)
}

async function updateCreditReasonService(creditReasonObj: CreditReasonModel) {
    await updateCreditReasonDetails(creditReasonObj);
}

export {
    getAllCreditReasonDetailsService,
    addCreditReasonService,
    updateCreditReasonService
}