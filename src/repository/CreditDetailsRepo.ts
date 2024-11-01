import { openDBConnection } from './OpenSqllite';
import { SQLiteRunResult } from "expo-sqlite";
import { CreditModel, CreditReasonModel } from '../model';

async function getAllCreditReasonDetails(){
    const db = await openDBConnection();
    const allRows: CreditReasonModel[] = await db.getAllAsync('SELECT * FROM credit_reasons');

    return allRows;
}

async function addCreditReasonDetails(creditReasonObj: CreditReasonModel): Promise<SQLiteRunResult> {
    const db = await openDBConnection();
    let sqlResult = await db.runAsync('INSERT INTO credit_reasons (credit_reason_name, credit_reason_catagory) VALUES (?, ?)',
        creditReasonObj.credit_reason_name, creditReasonObj.credit_reason_catagory
    );
    return sqlResult

}

async function updateCreditReasonDetails(creditReasonObj: CreditReasonModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('UPDATE credit_reasons SET credit_reason_name = ?, credit_reason_catagory = ?   WHERE credit_reason_id  = ?',
        creditReasonObj.credit_reason_name, creditReasonObj.credit_reason_catagory, creditReasonObj.credit_reason_id
    );
}

async function getCreditDetails(): Promise<CreditModel[]> {
    const db = await openDBConnection();
    const creditDetails: CreditModel[] = await db.getAllAsync('SELECT * FROM credits ORDER BY timestamp DESC;');
    return creditDetails;
}

async function getExpenseReasonByID(creditReasonId: number): Promise<CreditReasonModel> {
    const db = await openDBConnection();
    const creditReasonDetails: CreditReasonModel = await db.getFirstAsync('SELECT * FROM credit_reasons WHERE credit_reason_id = ?', creditReasonId);
    return creditReasonDetails;
}

async function getCreditByDate(fromDate: string, toDate: string): Promise<CreditModel[]> {
    const db = await openDBConnection();
    const creditDetails: CreditModel[] = await db.getAllAsync("SELECT * FROM credits WHERE DATE(timestamp)<= ? AND DATE(timestamp) >= ? ORDER BY timestamp DESC;", toDate, fromDate);
    return creditDetails;
}

async function addCreditDetails(creditObj: CreditModel) {
    const db = await openDBConnection();
    let sqlResult = await db.runAsync(
        'INSERT INTO credits (fund_id_fk,credit_reason_id_fk,person_id_fk, amount, message) VALUES (?, ?, ?, ?, ?)',
        creditObj.fund_id_fk, creditObj.credit_reason_id_fk, creditObj.person_id_fk, creditObj.amount, creditObj.message
    );

}

export {
    getAllCreditReasonDetails,
    addCreditReasonDetails,
    updateCreditReasonDetails,
    getCreditDetails,
    getExpenseReasonByID,
    getCreditByDate,
    addCreditDetails
}