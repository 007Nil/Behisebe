CREATE DATABASE IF NOT EXISTS Behisebe;
USE Behisebe;

CREATE TABLE BankAccountType (
	ID TINYINT NOT NULL AUTO_INCREMENT,
	AccountType VARCHAR(255) NOT NULL,
	PRIMARY KEY (ID)
);

INSERT INTO BankAccountType
(AccountType)
VALUES 
("Current Account"),
("Savings Account"),
("Salary Account");



CREATE TABLE Bank (
	BankID VARCHAR(255) NOT NULL,
	BankName VARCHAR(255) NOT NULL,
	AccountType TINYINT(3),
	IsDefault TINYINT (1) NOT NULL,
	Notes TEXT,
	PRIMARY KEY (BankID),
	FOREIGN KEY (AccountType) REFERENCES BankAccountType(ID)
);

CREATE TABLE Credit (
	CreditID VARCHAR(255) NOT NULL,
	BankID VARCHAR(255) NOT NULL,
	Amount INT NOT NULL,
	PRIMARY KEY (CreditID),
	FOREIGN KEY (BankID) REFERENCES Bank(BankID)
);