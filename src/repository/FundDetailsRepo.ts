import FundDetailsModel from '../model/FundDetailsModel';
import { openDBConnection } from './OpenSqllite';

async function getAllFundDetails(): Promise<FundDetailsModel[]> {
    const db = await openDBConnection();
    const allRows: FundDetailsModel[] = await db.getAllAsync('SELECT * FROM fund_details');
   
    return allRows;
}

async function addFundDetails(fundObj: FundDetailsModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO fund_details (fund_name, fund_type,notes,is_active,balance) VALUES (?, ?,?,?,?)',
        fundObj.fund_name, fundObj.fund_type, fundObj.notes, 1, fundObj.balance
    );
}

async function updateFundDetails(fund_id: number, fund_status: number): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('UPDATE fund_details SET is_active =?  WHERE fund_id = ?', fund_status, fund_id);

}

export {
    addFundDetails,
    getAllFundDetails,
    updateFundDetails
};