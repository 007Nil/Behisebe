package main

import (
	"behisebe/models"
	"database/sql"
	"fmt"
	"math/rand"

	// "sync"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// var wg sync.WaitGroup

func connectDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", "sergey:sergey@tcp(localhost:3306)/Behisebe")

	return db, err

}

func fetchAllUsers(db *sql.DB) []string {
	var userSlice []string
	results, err := db.Query("SELECT ID FROM User")
	if err != nil {
		panic(err.Error())

	}
	for results.Next() {
		var user models.User
		err = results.Scan(&user.Id)
		if err != nil {
			panic(err.Error())
		}
		userSlice = append(userSlice, user.Id)
	}

	return userSlice
}

func fetchAllBank(db *sql.DB) []models.Bank {
	var bankSlice []models.Bank
	results, err := db.Query("SELECT BankID,UserID FROM Bank")

	if err != nil {
		panic(err.Error())

	}
	for results.Next() {
		var bank models.Bank
		err = results.Scan(&bank.Id, &bank.UserId)
		if err != nil {
			panic(err.Error())
		}
		bankSlice = append(bankSlice, bank)
	}
	return bankSlice
}

func fetchDailyClosing(dailyClosing models.DailyClosing, db *sql.DB) bool {
	var dClosing models.DailyClosing
	isValue := true
	err := db.QueryRow("SELECT ID FROM DailyClosing WHERE `BankId` = ? AND `UserId` = ? AND `Date` = ?", dailyClosing.BankId, dailyClosing.UserId, dailyClosing.Date).Scan(&dClosing.Id)
	// fmt.Print(dailyClosing)
	if err != nil {
		// panic(err.Error())
		isValue = false

	}
	return isValue
}

func fetchDailyClosingCash(dcCash models.DailyClosingCash, db *sql.DB) bool {
	var newDCCash models.DailyClosingCash
	isValue := true
	err := db.QueryRow("SELECT ID FROM DailyClosingCash WHERE `UserId` = ? AND `Date` = ?", dcCash.UserId, dcCash.Date).Scan(&newDCCash.Id)
	// fmt.Print(dailyClosing)
	if err != nil {
		// panic(err.Error())
		isValue = false

	}
	return isValue
}

func fetchDailyClosingPreviosDate(dailyClosing models.DailyClosing, db *sql.DB) int {
	var dClosing models.DailyClosing
	err := db.QueryRow("SELECT Amount FROM DailyClosing WHERE `BankId` = ? AND `UserId` = ? AND `Date` = DATE_SUB(?,INTERVAL 1 DAY)", dailyClosing.BankId, dailyClosing.UserId, dailyClosing.Date).Scan(&dClosing.Amount)
	if err != nil {
		fmt.Println(err.Error())
		return 0

	}
	return dClosing.Amount
}

func fetchDailyClosingCashPreviosDate(dcCash models.DailyClosingCash, db *sql.DB) int {
	var newDCCash models.DailyClosingCash
	err := db.QueryRow("SELECT Amount FROM DailyClosingCash WHERE `UserId` = ? AND `Date` = DATE_SUB(?,INTERVAL 1 DAY)", dcCash.UserId, dcCash.Date).Scan(&newDCCash.Amount)
	if err != nil {
		fmt.Println(err.Error())
		return 0

	}
	return newDCCash.Amount
}

func insertDailyClosing(db *sql.DB, dClosing models.DailyClosing) {
	insert, err := db.Query("INSERT INTO DailyClosing VALUES ( ?, ?, ?, ?, ? )", dClosing.Id, dClosing.Date, dClosing.Amount, dClosing.BankId, dClosing.UserId)

	// if there is an error inserting, handle it
	if err != nil {
		fmt.Println(err.Error())
	}
	defer insert.Close()
	// wg.Done()
}

func insertDailyClosingCash(db *sql.DB, dcCash models.DailyClosingCash) {
	insert, err := db.Query("INSERT INTO DailyClosingCash VALUES ( ?, ?, ?, ? )", dcCash.Id, dcCash.Date, dcCash.Amount, dcCash.UserId)

	// if there is an error inserting, handle it
	if err != nil {
		fmt.Println(err.Error())
	}
	defer insert.Close()
	// wg.Done()
}

func init() {
	rand.Seed(time.Now().UnixNano())
}

var letters = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randSeq(n int) string {
	b := make([]rune, n)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func main() {
	db, err := connectDB()
	if err != nil {
		fmt.Println(err.Error())
	}

	// defer the close till after the main function has finished
	// executing
	defer db.Close()
	fmt.Println("Connected")

	allUser := fetchAllUsers(db)
	allBank := fetchAllBank(db)
	// fmt.Println(allUser)
	// Logic for DailyClosing
	var dailyClosingSlice []models.DailyClosing
	for _, bank := range allBank {
		var dailyClosing models.DailyClosing
		dailyClosing.BankId = bank.Id
		dailyClosing.UserId = bank.UserId
		dailyClosing.Date = time.Now().Format("2006-01-02")
		dailyClosingSlice = append(dailyClosingSlice, dailyClosing)
	}

	for _, closing := range dailyClosingSlice {
		if !fetchDailyClosing(closing, db) {
			var newdClosing models.DailyClosing
			newdClosing.Id = randSeq(20)
			newdClosing.Amount = fetchDailyClosingPreviosDate(closing, db)
			newdClosing.Date = closing.Date
			newdClosing.UserId = closing.UserId
			newdClosing.BankId = closing.BankId
			// fmt.Println(newdClosing)
			// wg.Add(1)
			insertDailyClosing(db, newdClosing)
		}
	}

	// fetchDailyClosing(dailyClosingSlice)
	// Logic for Dailycash Clsoing
	var dcCashSlice []models.DailyClosingCash
	for _, userId := range allUser {
		var dcCash models.DailyClosingCash
		fmt.Println(userId)
		dcCash.UserId = userId
		dcCash.Date = time.Now().Format("2006-01-02")
		dcCashSlice = append(dcCashSlice, dcCash)
	}

	for _, cashClosing := range dcCashSlice {
		if !fetchDailyClosingCash(cashClosing, db) {
			var newDCCash models.DailyClosingCash
			newDCCash.Id = randSeq(20)
			newDCCash.Date = cashClosing.Date
			newDCCash.UserId = cashClosing.UserId
			newDCCash.Amount = fetchDailyClosingCashPreviosDate(cashClosing, db)
			// fmt.Println(cashClosing.UserId)
			insertDailyClosingCash(db, newDCCash)
		}

	}

	fmt.Print("Done")

}
