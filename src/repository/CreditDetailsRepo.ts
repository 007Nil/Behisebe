import { openDBConnection } from './OpenSqllite';
import { SQLiteRunResult } from "expo-sqlite";
import { CreditModel, CreditReasonModel } from '../model';

async function getAllCreditReasonDetails() {
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

async function getCreditByDate(fromDate: string, toDate: string): Promise<CreditModel[]> {
    const db = await openDBConnection();
    const creditDetails: CreditModel[] = await db.getAllAsync("SELECT * FROM credits WHERE timestamp BETWEEN ? AND ? ORDER BY timestamp DESC;", fromDate, toDate);

    return creditDetails;
}

async function getCreditDetailsById(creditId: number): Promise<CreditModel> {
    const db = await openDBConnection();
    const creditDetails: CreditModel = await db.getFirstAsync('SELECT * FROM credits WHERE credit_id = ? ORDER BY timestamp DESC;', creditId);
    return creditDetails;
}

async function deleteCreditData(creditId: number) {
    // DELETE FROM artists_backup
    const db = await openDBConnection();
    await db.runAsync("DELETE FROM credits WHERE credit_id = ?", creditId);
}



async function addCreditDetails(creditObj: CreditModel): Promise<number> {
    const db = await openDBConnection();
    if (creditObj.timestamp != "") {
        let sqlResult = await db.runAsync(
            'INSERT INTO credits (fund_id_fk,credit_reason_id_fk,person_id_fk, amount, message,expense_id,timestamp) VALUES (?, ?, ?, ?, ?,?,?)',
            creditObj.fund_id_fk, creditObj.credit_reason_id_fk, creditObj.person_id_fk, creditObj.amount,
            creditObj.message, creditObj.expense_id, creditObj.timestamp
        );
        return sqlResult.lastInsertRowId;
    } else {
        let sqlResult = await db.runAsync(
            'INSERT INTO credits (fund_id_fk,credit_reason_id_fk,person_id_fk, amount, message,expense_id) VALUES (?, ?, ?, ?, ?,?)',
            creditObj.fund_id_fk, creditObj.credit_reason_id_fk, creditObj.person_id_fk, creditObj.amount, creditObj.message, creditObj.expense_id
        );
        return sqlResult.lastInsertRowId;
    }
}

async function getCreditReasonById(creditReasonId: number) {
    const db = await openDBConnection();
    const creditReasonDetails: CreditReasonModel = await db.getFirstAsync('SELECT * FROM credit_reasons WHERE credit_reason_id = ?', creditReasonId);
    return creditReasonDetails;
}

async function getCreditReasonByName(creditReasonName: string) {
    const db = await openDBConnection();
    const creditReasonDetails: CreditReasonModel = await db.getFirstAsync('SELECT * FROM credit_reasons WHERE credit_reason_name = ?', creditReasonName);
    return creditReasonDetails;
}

async function getBorrowMoneyCreditDetails(): Promise<CreditModel[]> {
    const db = await openDBConnection();
    const creditDetails: CreditModel[] = await db.getAllAsync("SELECT * FROM credits WHERE credit_reason_id_fk = ? AND dismiss_borrow != ? ORDER BY timestamp DESC;", 2,1);
    return creditDetails;
}

async function updateCreditDetails(creditModel: CreditModel) {
    const db = await openDBConnection();
    let sqlResult = await db.runAsync(
        'UPDATE credits SET amount = ? WHERE credit_id = ?',
        creditModel.amount, creditModel.credit_id
    );
}

async function deleteCreditDetails(creditId: number) {
    const db = await openDBConnection();
    await db.runAsync('DELETE FROM credits WHERE credit_id = ?', creditId);
}

async function getCreditDetailsByFundId(fundId: number) {
    const db = await openDBConnection();
    const creditDetails: CreditModel[] = await db.getAllAsync("SELECT * FROM credits WHERE fund_id_fk = ?", fundId);
    return creditDetails;
}

async function dismissBorrow(creditId: number) {
    const db = await openDBConnection();
    db.runAsync(
        'UPDATE credits SET dismiss_borrow = ? WHERE credit_id = ?',
        1, creditId
    );
}

export {
    getAllCreditReasonDetails,
    addCreditReasonDetails,
    updateCreditReasonDetails,
    getCreditDetails,
    getCreditByDate,
    addCreditDetails,
    getCreditReasonById,
    getCreditReasonByName,
    getBorrowMoneyCreditDetails,
    getCreditDetailsById,
    deleteCreditData,
    updateCreditDetails,
    deleteCreditDetails,
    getCreditDetailsByFundId,
    dismissBorrow
}