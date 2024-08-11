CREATE DATABASE IF NOT EXISTS behisebe;

USE behisebe;

CREATE TABLE users (
    user_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    username VARCHAR(255),
    PRIMARY KEY (user_id)
);

CREATE TABLE fund_account_types (
    fund_account_type_id INT NOT NULL AUTO_INCREMENT UNIQUE,
    account_type VARCHAR(255) NOT NULL,
    PRIMARY KEY (fund_account_type_id)
);

INSERT INTO
    fund_account_types (account_type)
VALUES ("Current Account"),
    ("Savings Account"),
    ("Salary Account"),
    ("Credit Card");

CREATE TABLE fund_details (
    fund_id VARCHAR(255) NOT NULL UNIQUE,
    fund_name VARCHAR(255) NOT NULL,
    account_type_fk INt,
    user_id_fk INT,
    added_on Date NOT NULL,
    notes TEXT,
    PRIMARY KEY (fund_id),
    FOREIGN KEY (user_id_fk) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (account_type_fk) REFERENCES fund_account_types (fund_account_type_id) ON DELETE CASCADE
);

-- Person details related to lend and clear debt

CREATE TABLE persons (
    person_id INT NOT NULL UNIQUE AUTO_INCREMENT,
    person_name VARCHAR(255) NOT NULL,
    user_id_fk INT NOT NULL,
    PRIMARY KEY (person_id),
    FOREIGN KEY (user_id_fk) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE lend_details (
    lend_id VARCHAR(255) NOT NULL UNIQUE,
    lend_to_fk INT NULL,
    lend_form_fk INT NULL,
    amount INT NOT NULL,
    partial_amount INT NOT NULL DEFAULT 0,
    full_payment TINYINT(1) DEFAULT 0,
    payment_one_date DATE NULL,
    user_id_fk INt NOT NULL,
    PRIMARY KEY (lend_id),
    FOREIGN KEY (lend_to_fk) REFERENCES persons (person_id) ON DELETE CASCADE,
    FOREIGN KEY (lend_form_fk) REFERENCES persons (person_id) ON DELETE CASCADE,
    Foreign Key (user_id_fk) REFERENCES users (user_id) ON DELETE CASCADE
);

CREATE TABLE partial_payments (
    partial_payment_id VARCHAR(255) NOT NULL UNIQUE,
    on_date DATE NOT NULL,
    amount INT NOT NULL,
    lend_id_fk VARCHAR(255) NOT NULL,
    by_cash TINYINT(1) NULL,
    fund_id_fk VARCHAR(255) NULL,
    PRIMARY KEY (partial_payment_id),
    FOREIGN KEY (lend_id_fk) REFERENCES lend_details (lend_id) ON DELETE CASCADE,
    FOREIGN KEY (fund_id_fk) REFERENCES fund_details (fund_id) ON DELETE CASCADE
);

-- Expense related statements

CREATE TABLE expense_reasons (
    expense_reason_id INT NOT NULL AUTO_INCREMENT,
    expense_reason VARCHAR(255) NOT NULL,
    user_id_fk INT NULL,
    PRIMARY KEY (expense_reason_id),
    Foreign Key (user_id_fk) REFERENCES users (user_id)
);

INSERT INTO
    expense_reasons (expense_reason, user_id_fk)
VALUES 
    ("Lend", NULL),
    ("Pay Of Debt", NULL),
    ("Cash Withdrawal",NULL),
    ("Self Transfer",NULL);

CREATE TABLE expense_details (
    expense_id VARCHAR(255) NOT NULL UNIQUE,
    fund_id_fk VARCHAR(255) NULL,
    by_cash TINYINT(1) DEFAULT 0,
    user_id_fk INT NOT NULL,
    lend_id_fk VARCHAR(255) NULL,
    lend_closed TINYINT(1) NULL,
    expense_reason_fk INt NOT NULL,
    expense_date DATE NOT NULL,
    notes TEXT,
    amount INT NOT NULL,
    PRIMARY KEY (expense_id),
    FOREIGN KEY (fund_id_fk) REFERENCES fund_details (fund_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_fk) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (lend_id_fk) REFERENCES lend_details (lend_id) ON DELETE CASCADE,
    FOREIGN KEY (expense_reason_fk) REFERENCES expense_reasons (expense_reason_id) ON DELETE CASCADE
);

-- Credit Related Tables

CREATE TABLE credit_reasons (
    credit_reason_id INT NOT NULL AUTO_INCREMENT,
    credit_reason VARCHAR(255) NOT NULL,
    user_id_fk INT NULL,
    PRIMARY KEY (credit_reason_id),
    Foreign Key (user_id_fk) REFERENCES users (user_id)
);

INSERT INTO
    credit_reasons (credit_reason, user_id_fk)
VALUES 
    ("Borrow", NULL),
    ("Pay Of Debt",NULL),
    ("Added Fund Details",NULL),
    ("Self Transfer",NULL);

CREATE TABLE credit_details (
    credit_id VARCHAR(255) NOT NULL UNIQUE,
    fund_id_fk VARCHAR(255) NULL,
    user_id_fk INT NOT NULL,
    lend_id_fk VARCHAR(255) NULL,
    is_lend_pad TINYINT(1) NULL,
    is_by_cash TINYINT(1) DEFAULT 0,
    credit_reason_fk INt NOT NULL,
    credit_date DATE NOT NULL,
    amount INT NOT NULL,
    notes TEXT,
    PRIMARY KEY (credit_id),
    FOREIGN KEY (fund_id_fk) REFERENCES fund_details (fund_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id_fk) REFERENCES users (user_id) ON DELETE CASCADE,
    FOREIGN KEY (lend_id_fk) REFERENCES lend_details (lend_id) ON DELETE CASCADE,
    FOREIGN KEY (credit_reason_fk) REFERENCES credit_reasons (credit_reason_id) ON DELETE CASCADE
);

-- Closing Balance
-- Daily Closing
-- Monthly Closing
-- Yearly Closing

-- CREATE TABLE Months (
--     ID INT NOT NULL AUTO_INCREMENT,
--     Name VARCHAR(255) NOT NULL,
--     PRIMARY KEY (ID)
-- );

-- INSERT INTO
--     Months (Name)
-- VALUES ("Jan"),
--     ("Feb"),
--     ("Mar"),
--     ("Apr"),
--     ("May"),
--     ("Jun"),
--     ("Jul"),
--     ("Aug"),
--     ("Sep"),
--     ("Oct"),
--     ("Nov"),
--     ("Dec");

-- CREATE TABLE DailyClosing (
--     ID VARCHAR(255) NOT NULL UNIQUE,
--     Date DATE,
--     Amount INT,
--     BankId VARCHAR(255) NOT NULL,
--     UserId VARCHAR(255) NOT NULL,
--     PRIMARY KEY (ID),
--     FOREIGN KEY (BankId) REFERENCES Bank (BankID) ON DELETE CASCADE,
--     FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
-- );

-- CREATE TABLE MonthlyClosing (
--     ID VARCHAR(255) NOT NULL UNIQUE,
--     MonthId INT NOT NULL,
--     Amount INT NOT NULL,
--     Year VARCHAR(20),
--     BankId VARCHAR(255) NOT NULL,
--     UserId VARCHAR(255) NOT NULL,
--     PRIMARY KEY (ID),
--     FOREIGN KEY (MonthId) REFERENCES Months (ID) ON DELETE CASCADE,
--     FOREIGN KEY (BankId) REFERENCES Bank (BankID) ON DELETE CASCADE,
--     FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
-- );

-- CREATE TABLE YearlyClosing (
--     ID VARCHAR(255) NOT NULL UNIQUE,
--     Amount INT NOT NULL,
--     Year VARCHAR(20),
--     BankId VARCHAR(255) NOT NULL,
--     UserId VARCHAR(255) NOT NULL,
--     PRIMARY KEY (ID),
--     FOREIGN KEY (BankId) REFERENCES Bank (BankID) ON DELETE CASCADE,
--     FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
-- );

-- -- For Cash transaction
-- CREATE TABLE DailyClosingCash (
--     ID VARCHAR(255) NOT NULL UNIQUE,
--     Date DATE,
--     Amount INT,
--     UserId VARCHAR(255) NOT NULL,
--     PRIMARY KEY (ID),
--     FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
-- );

-- CREATE TABLE MonthlyClosingCash (
--     ID VARCHAR(255) NOT NULL UNIQUE,
--     MonthId INT NOT NULL,
--     Amount INT NOT NULL,
--     Year VARCHAR(20),
--     UserId VARCHAR(255) NOT NULL,
--     PRIMARY KEY (ID),
--     FOREIGN KEY (MonthId) REFERENCES Months (ID) ON DELETE CASCADE,
--     FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
-- );

-- CREATE TABLE YearlyClosingCash (
--     ID VARCHAR(255) NOT NULL UNIQUE,
--     Amount INT NOT NULL,
--     Year VARCHAR(20),
--     UserId VARCHAR(255) NOT NULL,
--     PRIMARY KEY (ID),
--     FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
-- );

-- DROP DATABASE Behisebe;