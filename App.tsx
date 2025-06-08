import "react-native-gesture-handler";
import React from "react";
import AppNavigator from "./src/navigation/AppNavigator";
import { SQLiteProvider, type SQLiteDatabase } from 'expo-sqlite';
import { INIT_DB_SQL } from "./src/sql/initDb";
import { version as APP_VERSION } from "./package.json";
export default function App() {

    return (
        <SQLiteProvider databaseName="behisebe.db" onInit={migrateDbIfNeeded}>
            <AppNavigator />
        </SQLiteProvider>
    );
}

async function migrateDbIfNeeded(db: SQLiteDatabase) {
    await db.execAsync('BEGIN TRANSACTION;');
    try {

        // 1. List of migrations (add more as needed)
        const migrations = [
            {
                name: 'create_migrations_table',
                sql: `
                    CREATE TABLE IF NOT EXISTS migrations (
                        name TEXT PRIMARY KEY,
                        applied_at DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
                    );
                `
            },
            {
                name: 'create_app_meta',
                sql: `
                    CREATE TABLE IF NOT EXISTS app_meta (
                        key TEXT PRIMARY KEY,
                        value TEXT
                    );
                `
            },
            {
                name: 'set_app_version',
                sql: `
                    INSERT OR REPLACE INTO app_meta (key, value) VALUES ('app_version', '${APP_VERSION}');
                `
            },
            {
                name: 'init_db',
                sql: INIT_DB_SQL
            },
            {
                name: 'add_credit_limit_to_fund_details',
                sql: `ALTER TABLE fund_details ADD COLUMN credit_limit INTEGER DEFAULT (NULL);`,
                check: async () => {
                    const count = await db.getFirstAsync(
                        'SELECT count(*) FROM pragma_table_info(?) WHERE name=?',
                        "fund_details", "credit_limit"
                    );
                    return count["count(*)"] < 1;
                }
            },
            {
                name: 'add_dismiss_lend_to_expenses',
                sql: `ALTER TABLE expenses ADD COLUMN dismiss_lend INTEGER DEFAULT (0);`,
                check: async () => {
                    const count = await db.getFirstAsync(
                        'SELECT count(*) FROM pragma_table_info(?) WHERE name=?',
                        "expenses", "dismiss_lend"
                    );
                    return count["count(*)"] < 1;
                }
            },
            {
                name: 'add_dismiss_borrow_to_credits',
                sql: `ALTER TABLE credits ADD COLUMN dismiss_borrow INTEGER DEFAULT (0);`,
                check: async () => {
                    const count = await db.getFirstAsync(
                        'SELECT count(*) FROM pragma_table_info(?) WHERE name=?',
                        "credits", "dismiss_borrow"
                    );
                    return count["count(*)"] < 1;
                }
            }
        ];

        // 2. Apply migrations if not already applied
        for (const migration of migrations) {
            const alreadyApplied = await db.getFirstAsync(
                'SELECT 1 FROM migrations WHERE name = ?',
                migration.name
            );
            let shouldApply = !alreadyApplied;
            if (shouldApply && migration.check) {
                shouldApply = await migration.check();
            }
            if (shouldApply) {
                await db.execAsync(migration.sql);
                await db.runAsync('INSERT INTO migrations (name) VALUES (?)', migration.name);
            }
        }

        await db.execAsync('COMMIT;');
    } catch (error) {
        console.error("Error during database migration:", error);
        await db.execAsync('ROLLBACK;');
        throw error;
    }
}