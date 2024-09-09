import FundDetailsModel from '../model/FundDetailsModel';
import { openDBConnection } from './OpenSqllite';

async function addFundDetails(fundObj: FundDetailsModel) {
    const db = await openDBConnection();
    const result = await db.runAsync('INSERT INTO fund_details (fund_name, fund_type,notes,is_active) VALUES (?, ?,?,?)',
        fundObj.fund_name, fundObj.fund_type, fundObj.notes, 1
    );
    console.log(result.changes);

}

export {
    addFundDetails
};