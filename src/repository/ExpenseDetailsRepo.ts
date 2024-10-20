import { ExpenseReasonModel } from "../model";
import { openDBConnection } from './OpenSqllite';
import { SQLiteRunResult } from "expo-sqlite";

async function getAllExpenseReasonDetails(): Promise<ExpenseReasonModel[]> {
    const db = await openDBConnection();
    const allRows: ExpenseReasonModel[] = await db.getAllAsync('SELECT * FROM expense_reasons');

    return allRows;
}

async function addExpenseReasonDetails(expenseReasonObj: ExpenseReasonModel): Promise<SQLiteRunResult> {
    const db = await openDBConnection();
    let sqlResult = await db.runAsync('INSERT INTO expense_reasons (expense_reason_name, expense_reason_catagory) VALUES (?, ?)',
        expenseReasonObj.expense_reason_name, expenseReasonObj.expense_reason_catagory
    );
    return sqlResult

}

async function updateExpenseReasonDetails(expenseObj: ExpenseReasonModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('UPDATE expense_reasons SET expense_reason_name = ?, expense_reason_catagory = ?   WHERE expense_reason_id  = ?',
        expenseObj.expense_reason_name, expenseObj.expense_reason_catagory, expenseObj.expense_reason_id
    );

}

export {
    getAllExpenseReasonDetails,
    addExpenseReasonDetails,
    updateExpenseReasonDetails
}