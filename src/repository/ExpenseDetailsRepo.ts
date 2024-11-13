import { ExpenseReasonModel } from "../model";
import { ExpenseModel } from "../model";
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

async function updateExpenseDetailsCreditId(expId: number, creditId: number) {
    const db = await openDBConnection();
    await db.runAsync('UPDATE expenses SET credit_id = ? WHERE expense_id  = ?',
        creditId, expId
    );
}

async function updateExpenseReasonDetails(expenseReasonObj: ExpenseReasonModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('UPDATE expense_reasons SET expense_reason_name = ?, expense_reason_catagory = ?   WHERE expense_reason_id  = ?',
        expenseReasonObj.expense_reason_name, expenseReasonObj.expense_reason_catagory, expenseReasonObj.expense_reason_id
    );

}

async function updateExpenseDetails(expenseModel: ExpenseModel) {
    const db = await openDBConnection();
    let sqlResult = await db.runAsync(
        'UPDATE expenses SET amount = ? WHERE expense_id = ?',
        expenseModel.amount, expenseModel.expense_id
    );
}

async function deleteExpenseData(expID: number) {
    // DELETE FROM artists_backup
    const db = await openDBConnection();
    await db.runAsync("DELETE FROM expenses WHERE expense_id = ?", expID);
}

async function addExpenseDetails(expenseModel: ExpenseModel): Promise<number> {
    const db = await openDBConnection();
    if ( expenseModel.timestamp  !== "") {
        let sqlResult: SQLiteRunResult = await db.runAsync(
            'INSERT INTO expenses (fund_id_fk,expense_reason_id_fk,	person_id_fk, amount, message, credit_id, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)',
            expenseModel.fund_id_fk, expenseModel.expense_reason_id_fk, expenseModel.person_id_fk,
            expenseModel.amount, expenseModel.message, expenseModel.credit_id, expenseModel.timestamp
        );
        return sqlResult.lastInsertRowId;
    } else {
        let sqlResult: SQLiteRunResult = await db.runAsync(
            'INSERT INTO expenses (fund_id_fk,expense_reason_id_fk,	person_id_fk, amount, message, credit_id) VALUES (?, ?, ?, ?, ?, ?)',
            expenseModel.fund_id_fk, expenseModel.expense_reason_id_fk, expenseModel.person_id_fk, expenseModel.amount, expenseModel.message, expenseModel.credit_id
        );
        return sqlResult.lastInsertRowId;
    }
}
async function getExpenseDetails(): Promise<ExpenseModel[]> {
    const db = await openDBConnection();
    const expenseDetails: ExpenseModel[] = await db.getAllAsync('SELECT * FROM expenses ORDER BY timestamp DESC;');
    return expenseDetails;
}

async function getExpenseReasonByID(expenseReasonId: number): Promise<ExpenseReasonModel> {
    const db = await openDBConnection();
    const expenseReasonDetails: ExpenseReasonModel = await db.getFirstAsync('SELECT * FROM expense_reasons WHERE expense_reason_id = ?', expenseReasonId);
    return expenseReasonDetails;
}

async function getExpenseByID(expId: number): Promise<ExpenseModel> {
    const db = await openDBConnection();
    const expDetails: ExpenseModel = await db.getFirstAsync('SELECT * FROM expenses WHERE expense_id = ?', expId);
    return expDetails;
}


async function getExpenseByDate(fromDate: string, toDate: string): Promise<ExpenseModel[]> {
    const db = await openDBConnection();
    const expenseDetails: ExpenseModel[] = await db.getAllAsync("SELECT * FROM expenses WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC;", fromDate, toDate);
    return expenseDetails;
}

async function getExpenseReasonByName(expReasonName: string) {
    const db = await openDBConnection();
    const expenseReasonDetails: ExpenseReasonModel = await db.getFirstAsync('SELECT * FROM expense_reasons WHERE expense_reason_name = ?', expReasonName);
    return expenseReasonDetails;
}

async function getLendMoneyExpenseDetails(): Promise<ExpenseModel[]> {
    const db = await openDBConnection();
    const expenseDetails: ExpenseModel[] = await db.getAllAsync("SELECT * FROM expenses WHERE expense_reason_id_fk = 1");
    return expenseDetails;
}

async function getWeekExpense(): Promise<ExpenseModel[]> {
    const db = await openDBConnection();
    const expenseDetails: ExpenseModel[] = await db.getAllAsync("SELECT * FROM expenses WHERE DATE(timeStamp) >= DATE('now', 'weekday 0', '-7 days')");
    return expenseDetails;
}

async function getExpenseDetailsByFundId(fundId: number): Promise<ExpenseModel[]>{
    const db = await openDBConnection();
    const expenseDetails: ExpenseModel[] = await db.getAllAsync("SELECT * FROM expenses WHERE fund_id_fk = ?",fundId);
    return expenseDetails;
}

export {
    getAllExpenseReasonDetails,
    addExpenseReasonDetails,
    updateExpenseReasonDetails,
    addExpenseDetails,
    getExpenseDetails,
    getExpenseReasonByID,
    getExpenseByDate,
    getExpenseReasonByName,
    getLendMoneyExpenseDetails,
    updateExpenseDetails,
    deleteExpenseData,
    updateExpenseDetailsCreditId,
    getExpenseByID,
    getWeekExpense,
    getExpenseDetailsByFundId,
}