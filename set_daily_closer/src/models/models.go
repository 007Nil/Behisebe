package models

type User struct {
	Id string `json:"ID"`
}

type Bank struct {
	Id     string `json:"BankID"`
	UserId string `json:"UserID"`
}

type DailyClosing struct {
	Id     string `json:"ID"`
	UserId string `json:"UserID"`
	BankId string `json:"BankID"`
	Amount int    `json:"Amount"`
	Date   string `json:"Date"`
}

type DailyClosingCash struct {
	Id     string `json:"ID"`
	UserId string `json:"UserID"`
	Amount int    `json:"Amount"`
	Date   string `json:"Date"`
}
