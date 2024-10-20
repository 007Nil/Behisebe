import { SQLiteRunResult } from "expo-sqlite";
import { ExpenseReasonModel } from "../model";
import { getAllExpenseReasonDetails, updateExpenseReasonDetails, addExpenseReasonDetails } from "../repository/ExpenseDetailsRepo";

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

export {
    getAllExpenseReasonDetailsService,
    addExpenseReasonService,
    updateExpenseReasonService
}