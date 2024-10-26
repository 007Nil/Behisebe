import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

export default function App() {
  return (
    <SQLiteProvider databaseName="behisebe.db" onInit={migrateDbIfNeeded}>
      <AppNavigator />
    </SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  
  await db.execAsync(`
PRAGMA journal_mode = 'wal';
PRAGMA foreign_keys = ON;


--DROP TABLE IF EXISTS fund_details;
--DROP TABLE IF EXISTS expense_reasons;
--DROP TABLE IF EXISTS credit_reasons;
--DROP TABLE IF EXISTS persons;
--DROP TABLE IF EXISTS expenses;

CREATE TABLE IF NOT EXISTS fund_details (
    fund_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_name TEXT NOT NULL UNIQUE,
    fund_type TEXT NOT NULL,
    notes TEXT,
    is_active INTEGER,
    balance INTEGER,
    Timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS expense_reasons (
    expense_reason_id INTEGER PRIMARY KEY AUTOINCREMENT,
    expense_reason_name TEXT NOT NULL UNIQUE,
    expense_reason_catagory TEXT NOT NULL
);

INSERT INTO expense_reasons(expense_reason_name,expense_reason_catagory) 
SELECT 'Lend Money', 'Personal Expense'
WHERE NOT EXISTS(SELECT 1 FROM expense_reasons WHERE expense_reason_id = 1 AND expense_reason_name = 'Lend Money' AND expense_reason_catagory='Personal Expense');

CREATE TABLE IF NOT EXISTS credit_reasons (
    credit_reason_id INTEGER PRIMARY KEY AUTOINCREMENT,
    credit_reason_name TEXT NOT NULL UNIQUE,
    credit_reason_catagory TEXT NOT NULL
);

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
    FOREIGN KEY (fund_id_fk) REFERENCES fund_details(fund_id),
    FOREIGN KEY (expense_reason_id_fk) REFERENCES expense_reasons(expense_reason_id),
    FOREIGN KEY (person_id_fk) REFERENCES persons(person_id)
)
`);
  // await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
  // await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
  // CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);

}