import { SQLiteRunResult } from "expo-sqlite";
import { CreditModel, CreditReasonModel, FundDetailsModel } from "../model";
import { getAllCreditReasonDetails, addCreditReasonDetails, updateCreditReasonDetails, addCreditDetails } from "../repository/CreditDetailsRepo";
import { getFundDetailsById, updateFundBalance } from "../repository/FundDetailsRepo";

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

async function saveCreditDetailsService(creditObj: CreditModel) {
    await addCreditDetails(creditObj);
    // Update fund balance
    const fundDetails: FundDetailsModel = await getFundDetailsById(creditObj.fund_id_fk);
    const latestFundAmount = fundDetails.balance + creditObj.amount;
    await updateFundBalance(latestFundAmount, fundDetails.fund_id);
}

async function getCreditReasonById(creditReasonId: number) {
    return await getCreditReasonById(creditReasonId);
}

export {
    getAllCreditReasonDetailsService,
    addCreditReasonService,
    updateCreditReasonService,
    saveCreditDetailsService,
    getCreditReasonById
}