export const INIT_DB_SQL = `
PRAGMA journal_mode = 'wal';
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS fund_details (
    fund_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_name TEXT NOT NULL UNIQUE,
    fund_type TEXT NOT NULL,
    notes TEXT,
    is_active INTEGER NOT NULL,
    balance INTEGER NOT NULL,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);

INSERT INTO fund_details(fund_name,fund_type,notes,is_active,balance)
SELECT 'Cash', 'Cash InHand','Cash Fund',1,0
WHERE NOT EXISTS(SELECT 1 FROM fund_details WHERE fund_id = 1 AND fund_name = 'Cash' AND fund_type = 'Cash InHand');

CREATE TABLE IF NOT EXISTS fund_types (
    fund_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
    fund_type_name TEXT NOT NULL UNIQUE
);

INSERT INTO fund_types(fund_type_name)
SELECT 'Credit Card'
WHERE NOT EXISTS(SELECT 1 FROM fund_types WHERE fund_type_name = 'Credit Card');

INSERT INTO fund_types(fund_type_name)
SELECT 'Savings Account'
WHERE NOT EXISTS(SELECT 1 FROM fund_types WHERE fund_type_name = 'Savings Account');

INSERT INTO fund_types(fund_type_name)
SELECT 'Cash Fund'
WHERE NOT EXISTS(SELECT 1 FROM fund_types WHERE fund_type_name = 'Cash Fund');

INSERT INTO fund_types(fund_type_name)
SELECT 'Investment'
WHERE NOT EXISTS(SELECT 1 FROM fund_types WHERE fund_type_name = 'Investment');

INSERT INTO fund_types(fund_type_name)
SELECT 'Salary Account'
WHERE NOT EXISTS(SELECT 1 FROM fund_types WHERE fund_type_name = 'Salary Account');


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
SELECT 'Pay Back', 'Personal Expense'
WHERE NOT EXISTS(SELECT 1 FROM expense_reasons WHERE expense_reason_id = 3 AND expense_reason_name = 'Pay Back' AND expense_reason_catagory='Personal Expense');

INSERT INTO expense_reasons(expense_reason_name,expense_reason_catagory) 
SELECT 'Credit Card Bill', 'Credit Card Bill'
WHERE NOT EXISTS(SELECT 1 FROM expense_reasons WHERE expense_reason_id = 4 AND expense_reason_name = 'Credit Card Bill' AND expense_reason_catagory='Credit Card Bill');

CREATE TABLE IF NOT EXISTS credit_reasons (
    credit_reason_id INTEGER PRIMARY KEY AUTOINCREMENT,
    credit_reason_name TEXT NOT NULL UNIQUE,
    credit_reason_catagory TEXT NOT NULL
);


INSERT INTO credit_reasons(credit_reason_name,credit_reason_catagory) 
SELECT 'Self Transfer', 'Self Transfer'
WHERE NOT EXISTS(SELECT 1 FROM credit_reasons WHERE credit_reason_id = 1 AND credit_reason_name = 'Self Transfer' AND credit_reason_catagory='Self Transfer');

INSERT INTO credit_reasons(credit_reason_name,credit_reason_catagory) 
SELECT 'Borrow Money', 'Personal Credit'
WHERE NOT EXISTS(SELECT 1 FROM credit_reasons WHERE credit_reason_id = 2 AND credit_reason_name = 'Borrow Money' AND credit_reason_catagory='Personal Credit');

INSERT INTO credit_reasons(credit_reason_name,credit_reason_catagory) 
SELECT 'Pay Back', 'Personal Credit'
WHERE NOT EXISTS(SELECT 1 FROM credit_reasons WHERE credit_reason_id = 3 AND credit_reason_name = 'Pay Back' AND credit_reason_catagory='Personal Credit');

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
    credit_id INTEGER DEFAULT NUll,
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
    expense_id INTEGER DEFAULT NULL,
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

CREATE TABLE IF NOT EXISTS user (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_name TEXT NOT NULL UNIQUE,
    passwd TEXT NOT NULL,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);

CREATE TABLE IF NOT EXISTS backup_details (
    backup_id INTEGER PRIMARY KEY AUTOINCREMENT,
    backup_file_id TEXT NULL,
    backup_dir_id TEXT NULL,
    timestamp DATETIME DEFAULT (DATETIME(CURRENT_TIMESTAMP, 'LOCALTIME'))
);
`