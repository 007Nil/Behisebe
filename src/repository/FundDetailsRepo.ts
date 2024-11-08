import { SQLiteRunResult } from 'expo-sqlite';
import FundDetailsModel from '../model/FundDetailsModel';
import { openDBConnection } from './OpenSqllite';


type fundAmountType = {
    balance: number
}

async function getAllFundDetails(): Promise<FundDetailsModel[]> {
    const db = await openDBConnection();
    const allRows: FundDetailsModel[] = await db.getAllAsync('SELECT * FROM fund_details ORDER BY timestamp DESC;');
    console.log(allRows)
    return allRows;
}

async function addFundDetails(fundObj: FundDetailsModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO fund_details (fund_name, fund_type,notes,is_active,balance, credit_limit) VALUES (?, ?,?,?,?,?)',
        fundObj.fund_name, fundObj.fund_type, fundObj.notes, 1, fundObj.balance, fundObj.credit_limit
    );
}

async function updateFundDetails(fundObj: FundDetailsModel, fundStatus: number): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('UPDATE fund_details SET is_active =?, balance = ?  WHERE fund_id = ?', fundStatus, fundObj.balance, fundObj.fund_id);

}

async function getFundDetailsById(fundId: number): Promise<FundDetailsModel> {
    const db = await openDBConnection();
    const fundDetails: FundDetailsModel = await db.getFirstAsync('SELECT * FROM fund_details WHERE fund_id = ?', fundId);
    return fundDetails;
}

async function updateFundBalance(balance: number, fundId: number) {
    const db = await openDBConnection();
    await db.runAsync('UPDATE fund_details SET balance =?  WHERE fund_id = ?', balance, fundId);

}


async function getFundBalance(fundId: number): Promise<number> {
    const db = await openDBConnection();
    try {
        const fundAmount: fundAmountType = await db.getFirstAsync('SELECT balance FROM fund_details WHERE fund_id = ?', fundId);
        return fundAmount.balance;
    } catch {
        return 0;
    }
}

export {
    addFundDetails,
    getAllFundDetails,
    updateFundDetails,
    updateFundBalance,
    getFundDetailsById,
    getFundBalance
};