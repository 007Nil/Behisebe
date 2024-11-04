import { openDBConnection } from './OpenSqllite';
import { MoneyBorrowModel } from '../model';

async function addBorrowMoneyDetails(borrowMoneyObj: MoneyBorrowModel): Promise<void> {
    const db = await openDBConnection();
    await db.runAsync('INSERT INTO money_borrows (credit_id_fk, paid_amount) VALUES (?, ?)',
        borrowMoneyObj.credit_id_fk, borrowMoneyObj.paid_amount
    );
}

async function getBorrowMoneyByCreditId(expenseId:number): Promise<MoneyBorrowModel[]> {
    const db = await openDBConnection();
    const allRows: MoneyBorrowModel[] = await db.getAllAsync('SELECT * FROM money_borrows WHERE credit_id_fk = ? ORDER BY timestamp DESC;',expenseId);
    return allRows;
}

export {
    addBorrowMoneyDetails,
    getBorrowMoneyByCreditId
}