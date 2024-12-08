import { openDBConnection } from './OpenSqllite';

async function dropAllData() {
    const db = await openDBConnection();
    await db.execAsync(`
DELETE FROM money_lends;
DELETE FROM sqlite_sequence WHERE name = 'money_lends';
DELETE FROM money_borrows;
DELETE FROM sqlite_sequence WHERE name = 'money_borrows';
DELETE FROM expenses;
DELETE FROM sqlite_sequence WHERE name = 'expenses';
DELETE FROM credits;
DELETE FROM sqlite_sequence WHERE name = 'credits';
DELETE FROM fund_details;
DELETE FROM sqlite_sequence WHERE name = 'fund_details';
DELETE FROM expense_reasons;
DELETE FROM sqlite_sequence WHERE name = 'expense_reasons';
DELETE FROM credit_reasons;
DELETE FROM sqlite_sequence WHERE name = 'credit_reasons';
DELETE FROM persons;
DELETE FROM sqlite_sequence WHERE name = 'persons';
DELETE FROM fund_types;
DELETE FROM sqlite_sequence WHERE name = 'fund_types';
DELETE FROM user;
DELETE FROM sqlite_sequence WHERE name = 'user';
`);

}

export {dropAllData}