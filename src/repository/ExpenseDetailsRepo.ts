import { ExpenseReasonModel } from "../model";
import {ExpenseModel} from "../model";
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

async function updateExpenseReasonDetails(expenseReasonObj: ExpenseReasonModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('UPDATE expense_reasons SET expense_reason_name = ?, expense_reason_catagory = ?   WHERE expense_reason_id  = ?',
        expenseReasonObj.expense_reason_name, expenseReasonObj.expense_reason_catagory, expenseReasonObj.expense_reason_id
    );

}

async function addExpenseDetails(expenseModel:ExpenseModel) {
    const db = await openDBConnection();
    let sqlResult = await db.runAsync(
        'INSERT INTO expenses (fund_id_fk,expense_reason_id_fk,	person_id_fk, amount, message) VALUES (?, ?, ?, ?, ?)',
        expenseModel.fund_id_fk,expenseModel.expense_reason_id_fk,expenseModel.person_id_fk,expenseModel.amount, expenseModel.message
    );

}

export {
    getAllExpenseReasonDetails,
    addExpenseReasonDetails,
    updateExpenseReasonDetails,
    addExpenseDetails
}