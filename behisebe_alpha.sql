CREATE DATABASE IF NOT EXISTS Behisebe;

USE Behisebe;

CREATE TABLE
    User (
        ID VARCHAR(255) NOT NULL UNIQUE,
        FirstName VARCHAR(255),
        LastName VARCHAR(255),
        Email VARCHAR(255),
        PRIMARY KEY (ID)
    );

-- Demo data

INSERT INTO
    User (ID, FirstName, LastName, Email)
VALUES (
        "1234567890",
        "Sagnik",
        "Sarkar",
        "sagniksarkar@ymail.com"
    );

CREATE TABLE
    BankAccountType (
        ID TINYINT NOT NULL AUTO_INCREMENT UNIQUE,
        AccountType VARCHAR(255) NOT NULL,
        PRIMARY KEY (ID)
    );

INSERT INTO
    BankAccountType (AccountType)
VALUES ("Current Account"), ("Savings Account"), ("Salary Account");

CREATE TABLE
    Bank (
        BankID VARCHAR(255) NOT NULL UNIQUE,
        BankName VARCHAR(255) NOT NULL,
        AccountType TINYINT(3),
        UserID VARCHAR(255),
        IsDefault TINYINT (1) NOT NULL,
        AddedOn Date NOT NULL,
        Notes TEXT,
        PRIMARY KEY (BankID),
        FOREIGN KEY (UserID) REFERENCES User(ID) ON DELETE CASCADE,
        FOREIGN KEY (AccountType) REFERENCES BankAccountType(ID) ON DELETE CASCADE
    );

-- Person details related to lend and clear debt

CREATE TABLE
    Person (
        ID VARCHAR(255) NOT NULL UNIQUE,
        Name VARCHAR(255) NOT NULL,
        UserID VARCHAR(255) NOT NULL,
        PRIMARY KEY (ID),
        FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE
    );

CREATE TABLE
    Lend (
        ID VARCHAR(255) NOT NULL UNIQUE,
        LendTo VARCHAR(255) NULL,
        LendFrom VARCHAR(255) NULL,
        FullPayment TINYINT(1) DEFAULT 0,
        PaymentOnDate DATE NULL,
        UserID VARCHAR(255) NOT NULL,
        PRIMARY KEY (ID),
        FOREIGN KEY (LendTo) REFERENCES Person (ID) ON DELETE CASCADE,
        FOREIGN KEY (LendFrom) REFERENCES Person (ID) ON DELETE CASCADE,
        Foreign Key (UserID) REFERENCES User (ID) ON DELETE CASCADE
    );

CREATE TABLE
    PartialPaymemnt (
        ID VARCHAR(255) NOT NULL UNIQUE,
        OnDate DATE NOT NULL,
        Amount INT NOT NULL,
        LendId VARCHAR(255) NOT NULL,
        ByCash TINYINT(1) NULL,
        BankId VARCHAR(255) NULL,
        PRIMARY KEY (ID),
        FOREIGN KEY (LendId) REFERENCES Lend (ID) ON DELETE CASCADE,
        FOREIGN KEY (BankId) REFERENCES Bank (BankID) ON DELETE CASCADE
    );

-- Expense related statements

CREATE TABLE
    ExpenseReason (
        ID VARCHAR(255) NOT NULL,
        Reason VARCHAR(255) NOT NULL,
        UserID VARCHAR(255) NULL,
        PRIMARY KEY (ID),
        Foreign Key (UserID) REFERENCES User (ID)
    );

INSERT INTO
    ExpenseReason (ID, Reason, UserID)
VALUES ("0987654321", "Lend", NULL), (
        "1234567098",
        "Pay Of Debt",
        NULL
    ), (
        "6565454378",
        "Cash Withdrawal",
        NULL
    );

CREATE TABLE
    Expense (
        ID VARCHAR(255) NOT NULL UNIQUE,
        BankID VARCHAR(255) NULL,
        ByCash TINYINT(1) DEFAULT 0,
        UserID VARCHAR(255) NOT NULL,
        LendID VARCHAR(255) NULL,
        Reason VARCHAR(255) NOT NULL,
        Date DATE NOT NULL,
        Notes TEXT,
        Amount INT NOT NULL,
        PRIMARY KEY (ID),
        FOREIGN KEY (BankID) REFERENCES Bank (BankID) ON DELETE CASCADE,
        FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE,
        FOREIGN KEY (LendID) REFERENCES Lend (ID) ON DELETE CASCADE,
        FOREIGN KEY (Reason) REFERENCES ExpenseReason(ID) ON DELETE CASCADE
    );

-- Credit Related Tables

CREATE TABLE
    CreditReason (
        ID VARCHAR(255) NOT NULL,
        Reason VARCHAR(255) NOT NULL,
        UserID VARCHAR(255) NULL,
        PRIMARY KEY (ID),
        Foreign Key (UserID) REFERENCES User (ID)
    );

INSERT INTO
    CreditReason (ID, Reason, UserID)
VALUES ("765654343", "Borrow", NULL), (
        "098787651",
        "Pay Of Debt",
        NULL
    ), (
        "565434329",
        "Added Bank Details",
        NULL
    ),(
        "6765454367",
        "As Gift",
        NULL
    );

CREATE TABLE
    Credit (
        CreditID VARCHAR(255) NOT NULL UNIQUE,
        BankID VARCHAR(255) NULL,
        UserID VARCHAR(255) NOT NULL,
        LendID VARCHAR(255) NULL,
        ByCash TINYINT(1) DEFAULT 0,
        Reason VARCHAR(255) NOT NULL,
        Date DATE NOT NULL,
        Amount INT NOT NULL,
        Notes TEXT,
        PRIMARY KEY (CreditID),
        FOREIGN KEY (BankID) REFERENCES Bank(BankID) ON DELETE CASCADE,
        FOREIGN KEY (UserID) REFERENCES User (ID) ON DELETE CASCADE,
        FOREIGN KEY (LendID) REFERENCES Lend (ID) ON DELETE CASCADE,
        FOREIGN KEY (Reason) REFERENCES CreditReason(ID) ON DELETE CASCADE
    );

-- Closing Balance
-- Daily Closing
-- Monthly Closing
-- Yearly Closing

CREATE TABLE Months (
    ID INT NOT NULL AUTO_INCREMENT,
    Name VARCHAR(255) NOT NULL,
    PRIMARY KEY(ID)
);

INSERT INTO Months
(Name)
VALUES
("Jan"),
("Feb"),
("Mar"),
("Apr"),
("May"),
("Jun"),
("Jul"),
("Aug"),
("Sep"),
("Oct"),
("Nov"),
("Dec");


CREATE TABLE DailyClosing (
    ID VARCHAR(255) NOT NULL UNIQUE,
    Date DATE,
    Amount INT,
    BankId VARCHAR(255) NOT NULL,
    UserId VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (BankId) REFERENCES Bank(BankID) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
);

CREATE TABLE MonthlyClosing (
    ID VARCHAR(255) NOT NULL UNIQUE,
    MonthId INT NOT NULL,
    Amount INT NOT NULL,
    Year VARCHAR(20),
    BankId VARCHAR(255) NOT NULL,
    UserId VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (MonthId) REFERENCES Months(ID) ON DELETE CASCADE,
    FOREIGN KEY (BankId) REFERENCES Bank(BankID) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
);

CREATE TABLE YearlyClosing (
    ID VARCHAR(255) NOT NULL UNIQUE,
    Amount INT NOT NULL,
    Year VARCHAR(20),
    BankId VARCHAR(255) NOT NULL,
    UserId VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (BankId) REFERENCES Bank(BankID) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
);

-- For Cash transaction
CREATE TABLE DailyClosingCash (
    ID VARCHAR(255) NOT NULL UNIQUE,
    Date DATE,
    Amount INT,
    UserId VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
);

CREATE TABLE MonthlyClosingCash (
    ID VARCHAR(255) NOT NULL UNIQUE,
    MonthId INT NOT NULL,
    Amount INT NOT NULL,
    Year VARCHAR(20),
    UserId VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (MonthId) REFERENCES Months(ID) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
);

CREATE TABLE YearlyClosingCash (
    ID VARCHAR(255) NOT NULL UNIQUE,
    Amount INT NOT NULL,
    Year VARCHAR(20),
    UserId VARCHAR(255) NOT NULL,
    PRIMARY KEY (ID),
    FOREIGN KEY (UserId) REFERENCES User (ID) ON DELETE CASCADE
);



-- DROP DATABASE Behisebe;