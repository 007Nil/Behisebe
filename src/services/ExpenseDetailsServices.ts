import { SQLiteRunResult } from "expo-sqlite";
import { ExpenseReasonModel, ExpenseModel, FundDetailsModel } from "../model";
import { getAllExpenseReasonDetails, updateExpenseReasonDetails, addExpenseReasonDetails, addExpenseDetails, getExpenseDetails, getExpenseByDate, getExpenseReasonByName } from "../repository/ExpenseDetailsRepo";
import { getFundDetailsById, updateFundBalance } from "../repository/FundDetailsRepo";
import { dateConvert } from "../utils/AllUtils";

async function getAllExpenseReasonDetailsService(): Promise<ExpenseReasonModel[]> {
    return await getAllExpenseReasonDetails();
}

async function getValidExpenseReasonDetailsService(): Promise<ExpenseReasonModel[]> {
    const allExpenseReasonDetails: ExpenseReasonModel[] = await getAllExpenseReasonDetails();
    const validExpenseReasonDetails: ExpenseReasonModel[] = allExpenseReasonDetails.filter(obj => obj.expense_reason_name !== "Self Transfer");
    return validExpenseReasonDetails;
}

async function addExpenseReasonService(exposeReasonObj: ExpenseReasonModel) {
    let sqlResult: SQLiteRunResult = await addExpenseReasonDetails(exposeReasonObj);
    console.log(sqlResult)
}

async function updateExpenseReasonService(expeseReasonObj: ExpenseReasonModel) {
    await updateExpenseReasonDetails(expeseReasonObj);
}

async function saveExpenseDetailsService(expenseObj: ExpenseModel) {
    await addExpenseDetails(expenseObj);
    // Update fund balance
    const fundDetails: FundDetailsModel = await getFundDetailsById(expenseObj.fund_id_fk);
    const latestFundAmount = fundDetails.balance - expenseObj.amount;
    await updateFundBalance(latestFundAmount, fundDetails.fund_id);
}

async function getExpenseDetailsService(): Promise<ExpenseModel[]> {
    return await getExpenseDetails();
}

async function getExpenseReasonByNameService(expenseReasonName:string): Promise<ExpenseReasonModel> {
    return await getExpenseReasonByName(expenseReasonName);
}

async function getExpenseByDateService(fromDate: string, toDate: string): Promise<ExpenseModel[]> {
    let fromDateTime = dateConvert(fromDate) + " 00:00:00"
    let toDateTime = dateConvert(toDate) + " 23:59:59"
    return await getExpenseByDate(fromDateTime, toDateTime);
}
export {
    getAllExpenseReasonDetailsService,
    addExpenseReasonService,
    updateExpenseReasonService,
    saveExpenseDetailsService,
    getExpenseDetailsService,
    getExpenseByDateService,
    getExpenseReasonByNameService,
    getValidExpenseReasonDetailsService
}