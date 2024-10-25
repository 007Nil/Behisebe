import { openDBConnection } from './OpenSqllite';
import { SQLiteRunResult } from "expo-sqlite";
import { CreditReasonModel } from '../model';

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

export {
    getAllCreditReasonDetails,
    addCreditReasonDetails,
    updateCreditReasonDetails
}