import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';


export default function App() {

  return (
    <SQLiteProvider databaseName="behisebe.db" onInit={migrateDbIfNeeded}>
      <AppNavigator />
    </SQLiteProvider>
  );
}

// DROP TABLE IF EXISTS money_lends;
// DROP TABLE IF EXISTS money_borrows;
// DROP TABLE IF EXISTS expenses;
// DROP TABLE IF EXISTS credits;
// DROP TABLE IF EXISTS expenses;
// DROP TABLE IF EXISTS fund_details;
// DROP TABLE IF EXISTS expense_reasons;
// DROP TABLE IF EXISTS credit_reasons;
// DROP TABLE IF EXISTS persons;

async function migrateDbIfNeeded(db: SQLiteDatabase) {

  await db.execAsync(`
PRAGMA journal_mode = 'wal';
PRAGMA foreign_keys = ON;


CREATE TABLE IF NOT EXISTS fund_details (
    fund_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_name TEXT NOT NULL UNIQUE,
    fund_type TEXT NOT NULL,
    notes TEXT,
    is_active INTEGER,
    balance INTEGER,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);

INSERT INTO fund_details(fund_name,fund_type,notes,is_active,balance)
SELECT 'Cash', 'Cash InHand','Cash Fund',1,0
WHERE NOT EXISTS(SELECT 1 FROM fund_details WHERE fund_id = 1 AND fund_name = 'Cash' AND fund_type = 'Cash InHand');

INSERT INTO fund_details(fund_name,fund_type,notes,is_active,balance)
SELECT 'dummy card', 'Credit Card','',0,0
WHERE NOT EXISTS(SELECT 1 FROM fund_details WHERE fund_id = 2 AND fund_name = 'dummy card' AND fund_type = 'Credit Card');

CREATE TABLE IF NOT EXISTS expense_reasons (
    expense_reason_id INTEGER PRIMARY KEY AUTOINCREMENT,
    expense_reason_name TEXT NOT NULL UNIQUE,
    expense_reason_catagory TEXT NOT NULL
);

INSERT INTO expense_reasons(expense_reason_name,expense_reason_catagory) 
SELECT 'Lend Money', 'Personal Expense'
WHERE NOT EXISTS(SELECT 1 FROM expense_reasons WHERE expense_reason_id = 1 AND expense_reason_name = 'Lend Money' AND expense_reason_catagory='Personal Expense');


INSERT INTO expense_reasons(expense_reason_name,expense_reason_catagory) 
SELECT 'Self Transfer', 'Self Transfer'
WHERE NOT EXISTS(SELECT 1 FROM expense_reasons WHERE expense_reason_id = 2 AND expense_reason_name = 'Self Transfer' AND expense_reason_catagory='Self Transfer');

INSERT INTO expense_reasons(expense_reason_name,expense_reason_catagory) 
SELECT 'Replay Borrowed Money', 'Personal Expense'
WHERE NOT EXISTS(SELECT 1 FROM expense_reasons WHERE expense_reason_id = 3 AND expense_reason_name = 'Replay Borrowed Money' AND expense_reason_catagory='Personal Expense');

CREATE TABLE IF NOT EXISTS credit_reasons (
    credit_reason_id INTEGER PRIMARY KEY AUTOINCREMENT,
    credit_reason_name TEXT NOT NULL UNIQUE,
    credit_reason_catagory TEXT NOT NULL
);

INSERT INTO credit_reasons(credit_reason_name,credit_reason_catagory) 
SELECT 'Self Transfer', 'Self Transfer'
WHERE NOT EXISTS(SELECT 1 FROM credit_reasons WHERE credit_reason_id = 1 AND credit_reason_name = 'Self Transfer' AND credit_reason_catagory='Self Transfer');

INSERT INTO credit_reasons(credit_reason_name,credit_reason_catagory) 
SELECT 'Money Lend', 'Personal Credit'
WHERE NOT EXISTS(SELECT 1 FROM credit_reasons WHERE credit_reason_id = 2 AND credit_reason_name = 'Money Lend' AND credit_reason_catagory='Personal Credit');

INSERT INTO credit_reasons(credit_reason_name,credit_reason_catagory) 
SELECT 'Replay Money Lend', 'Personal Credit'
WHERE NOT EXISTS(SELECT 1 FROM credit_reasons WHERE credit_reason_id = 3 AND credit_reason_name = 'Replay Money Lend' AND credit_reason_catagory='Personal Credit');


CREATE TABLE IF NOT EXISTS persons (
    person_id INTEGER PRIMARY KEY AUTOINCREMENT,
    person_name TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS expenses (
    expense_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_id_fk INTEGER NOT NULL,
    expense_reason_id_fk INTEGER NOT NULL,
    person_id_fk INTEGER,
    amount INTEGER NOT NULL,
    message TEXT,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')),
    FOREIGN KEY (fund_id_fk) REFERENCES fund_details(fund_id),
    FOREIGN KEY (expense_reason_id_fk) REFERENCES expense_reasons(expense_reason_id),
    FOREIGN KEY (person_id_fk) REFERENCES persons(person_id)
);

CREATE TABLE IF NOT EXISTS money_lends (
    lend_id INTEGER PRIMARY KEY AUTOINCREMENT,
    expense_id_fk INTEGER NOT NULL,
    paid_amount INTEGER NOT NULL,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')),
    FOREIGN KEY (expense_id_fk) REFERENCES expenses(expense_id)
);

CREATE TABLE IF NOT EXISTS credits (
    credit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_id_fk INTEGER NOT NULL,
    credit_reason_id_fk INTEGER NOT NULL,
    person_id_fk INTEGER,
    amount INTEGER NOT NULL,
    message TEXT,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')),
    FOREIGN KEY (fund_id_fk) REFERENCES fund_details(fund_id),
    FOREIGN KEY (credit_reason_id_fk) REFERENCES credit_reasons(credit_reason_id),
    FOREIGN KEY (person_id_fk) REFERENCES persons(person_id)
);

CREATE TABLE IF NOT EXISTS money_borrows (
    borrow_id INTEGER PRIMARY KEY AUTOINCREMENT,
    credit_id_fk INTEGER NOT NULL,
    paid_amount INTEGER NOT NULL,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME')),
    FOREIGN KEY (credit_id_fk) REFERENCES credits(credit_id)
);

`);
}