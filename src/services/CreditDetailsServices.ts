import { SQLiteRunResult } from "expo-sqlite";
import { CreditModel, CreditReasonModel, FundDetailsModel } from "../model";
import { getAllCreditReasonDetails, addCreditReasonDetails, updateCreditReasonDetails, addCreditDetails, getCreditByDate, getCreditReasonById, getCreditReasonByName, updateCreditDetails } from "../repository/CreditDetailsRepo";
import { getFundDetailsById, updateFundBalance } from "../repository/FundDetailsRepo";
import { dateConvert } from "../utils/AllUtils";

async function getAllCreditReasonDetailsService(): Promise<CreditReasonModel[]> {
    return await getAllCreditReasonDetails();
}

async function getValidCreditReasonDetailsService(): Promise<CreditReasonModel[]> {
    const allCreditReasonDetails: CreditReasonModel[] = await getAllCreditReasonDetails();
    const validCreditReasonDetails: CreditReasonModel[] = allCreditReasonDetails.filter(obj => obj.credit_reason_name !== "Self Transfer");
    return validCreditReasonDetails;
}

async function addCreditReasonService(creditReasonObj: CreditReasonModel) {
    let sqlResult: SQLiteRunResult = await addCreditReasonDetails(creditReasonObj);
}

async function updateCreditReasonService(creditReasonObj: CreditReasonModel) {
    await updateCreditReasonDetails(creditReasonObj);
}

async function saveCreditDetailsService(creditObj: CreditModel): Promise<number> {
    const rowID: number  = await addCreditDetails(creditObj);
    // Update fund balance
    const fundDetails: FundDetailsModel = await getFundDetailsById(creditObj.fund_id_fk);
    const latestFundAmount = fundDetails.balance + creditObj.amount;
    await updateFundBalance(latestFundAmount, fundDetails.fund_id);
    return rowID;
}

async function getCreditReasonByIdService(creditReasonId: number) {
    return await getCreditReasonById(creditReasonId);
}

async function getCreditByDateService(fromDate: string, toDate: string) {
    let fromDateTime = fromDate + " 00:00:00"
    let toDateTime = toDate + " 23:59:59"
    return await getCreditByDate(fromDateTime, toDateTime);
}

async function getCreditReasonDetailsByNameService(creditReasonName: string) {
    return await getCreditReasonByName(creditReasonName);
}

async function updateCreditDetailsService(creditObj:CreditModel) {
    await updateCreditDetails(creditObj);
}

export {
    getAllCreditReasonDetailsService,
    addCreditReasonService,
    updateCreditReasonService,
    saveCreditDetailsService,
    getCreditReasonByIdService,
    getCreditByDateService,
    getCreditReasonDetailsByNameService,
    getValidCreditReasonDetailsService,
    updateCreditDetailsService
}