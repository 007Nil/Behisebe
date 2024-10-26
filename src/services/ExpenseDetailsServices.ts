import { SQLiteRunResult } from "expo-sqlite";
import { ExpenseReasonModel, ExpenseModel, FundDetailsModel } from "../model";
import { getAllExpenseReasonDetails, updateExpenseReasonDetails, addExpenseReasonDetails } from "../repository/ExpenseDetailsRepo";
import { getFundDetailsById, updateFundBalance } from "../repository/FundDetailsRepo";

async function getAllExpenseReasonDetailsService(): Promise<ExpenseReasonModel[]> {
    return await getAllExpenseReasonDetails();
}

async function addExpenseReasonService(exposeReasonObj: ExpenseReasonModel) {
    let sqlResult: SQLiteRunResult = await addExpenseReasonDetails(exposeReasonObj);
    console.log(sqlResult)
}

async function updateExpenseReasonService(expeseReasonObj: ExpenseReasonModel) {
    await updateExpenseReasonDetails(expeseReasonObj);
}

async function saveExpenseDetailsService(expenseObj: ExpenseModel){
    // Add Expense

    // Update fund balance
    const fundDetails: FundDetailsModel = await getFundDetailsById(expenseObj.fund_id_fk);
    const latestFundAmount = fundDetails.balance - expenseObj.amount;
    await updateFundBalance(latestFundAmount,fundDetails.fund_id);
    



}

export {
    getAllExpenseReasonDetailsService,
    addExpenseReasonService,
    updateExpenseReasonService,
    saveExpenseDetailsService
}