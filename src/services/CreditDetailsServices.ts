import { SQLiteRunResult } from "expo-sqlite";
import { CreditModel, CreditReasonModel, FundDetailsModel } from "../model";
import { getAllCreditReasonDetails, addCreditReasonDetails, updateCreditReasonDetails, addCreditDetails, getCreditByDate, getCreditReasonById, getCreditReasonByName } from "../repository/CreditDetailsRepo";
import { getFundDetailsById, updateFundBalance } from "../repository/FundDetailsRepo";
import { dateConvert } from "../utils/AllUtils";

async function getAllCreditReasonDetailsService(): Promise<CreditReasonModel[]> {
    return await getAllCreditReasonDetails();
}

async function addCreditReasonService(creditReasonObj: CreditReasonModel) {
    let sqlResult: SQLiteRunResult = await addCreditReasonDetails(creditReasonObj);
    // console.log(sqlResult)
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

async function getCreditReasonByIdService(creditReasonId: number) {
    return await getCreditReasonById(creditReasonId);
}

async function getCreditByDateService(fromDate:string, toDate: string) {
    let fromDateTime = dateConvert(fromDate) + " 00:00:00"
    let toDateTime = dateConvert(toDate) + " 23:59:59"
    return await getCreditByDate(fromDateTime, toDateTime);
}

async function getCreditReasonDetailsByNameService(creditReasonName:string) {
    return await getCreditReasonByName(creditReasonName);
}

export {
    getAllCreditReasonDetailsService,
    addCreditReasonService,
    updateCreditReasonService,
    saveCreditDetailsService,
    getCreditReasonByIdService,
    getCreditByDateService,
    getCreditReasonDetailsByNameService
}