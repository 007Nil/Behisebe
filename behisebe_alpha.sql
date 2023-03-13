CREATE DATABASE IF NOT EXISTS Behisebe;
USE Behisebe;


CREATE TABLE User (
	ID INT AUTO_INCREMENT NOT NULL UNIQUE,
	FirstName VARCHAR(255),
	LastName VARCHAR(255),
	Email VARCHAR(255),
	PRIMARY KEY (ID)
);
-- Demo data
INSERT INTO User
(FirstName,LastName,Email)
VALUES
("Sagnik","Sarkar","sagniksarkar@ymail.com");

CREATE TABLE BankAccountType (
	ID TINYINT NOT NULL AUTO_INCREMENT UNIQUE,
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
	BankID VARCHAR(255) NOT NULL UNIQUE,
	BankName VARCHAR(255) NOT NULL,
	AccountType TINYINT(3),
	UserID INT,
	IsDefault TINYINT (1) NOT NULL,
	Notes TEXT,
	PRIMARY KEY (BankID),
	FOREIGN KEY (UserID) REFERENCES User(ID),
	FOREIGN KEY (AccountType) REFERENCES BankAccountType(ID)
);

CREATE TABLE Credit (
	CreditID VARCHAR(255) NOT NULL UNIQUE,
	BankID VARCHAR(255) NOT NULL,
	Amount INT NOT NULL,
	PRIMARY KEY (CreditID),
	FOREIGN KEY (BankID) REFERENCES Bank(BankID)
);