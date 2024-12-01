import { openDBConnection } from './OpenSqllite';
import { LendMoneyModel } from '../model';

async function addLendMoneyDetails(lendMoneyObj: LendMoneyModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO money_lends (expense_id_fk, paid_amount) VALUES (?, ?)',
        lendMoneyObj.expense_id_fk, lendMoneyObj.paid_amount
    );
}

async function getLendMoneyByExpenseId(expenseId:number): Promise<LendMoneyModel[]> {
    const db = await openDBConnection();
    const allRows: LendMoneyModel[] = await db.getAllAsync('SELECT * FROM money_lends WHERE expense_id_fk = ? ORDER BY timestamp DESC;',expenseId);
    return allRows;
}

async function getAllLendMoney(): Promise<LendMoneyModel[]> {
    const db = await openDBConnection();
    const allRows : LendMoneyModel[] = await db.getAllAsync('SELECT * FROM money_lends');
    return allRows;
}

export {
    addLendMoneyDetails,
    getLendMoneyByExpenseId,
    getAllLendMoney
}