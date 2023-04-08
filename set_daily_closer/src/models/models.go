package models

type Bank struct {
	Id string `json:"BankID"`
}

type User struct {
	Id          string `json:"ID"`
	BankDetails Bank
}
