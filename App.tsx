import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SQLiteProvider, useSQLiteContext, type SQLiteDatabase } from 'expo-sqlite';

export default function App() {
  return (
    <SQLiteProvider databaseName="behisebe" onInit={migrateDbIfNeeded}>
      <AppNavigator />
    </SQLiteProvider>
  );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`
PRAGMA journal_mode = 'wal';
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS fund_account_types (
    fund_account_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_type TEXT NOT NULL
);

INSERT INTO fund_account_types (account_type) VALUES ("Current Account"),("Savings Account"),("Salary Account"),("Credit Card");

CREATE TABLE fund_details (
    fund_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_name TEXT NOT NULL,
    account_type_fk INt,
    added_on real NOT NULL,
    notes TEXT,
    FOREIGN KEY (account_type_fk) REFERENCES fund_account_types (fund_account_type_id) ON DELETE CASCADE
);

`);
  // await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'hello', 1);
  // await db.runAsync('INSERT INTO todos (value, intValue) VALUES (?, ?)', 'world', 2);
  // CREATE TABLE todos (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);

}