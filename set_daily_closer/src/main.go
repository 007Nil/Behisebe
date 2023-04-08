package main

import (
	"database/sql"
	"fmt"

	"behisebe/models"

	_ "github.com/go-sql-driver/mysql"
)

func connectDB() (*sql.DB, error) {
	db, err := sql.Open("mysql", "root:sxycmfczbe2ru5v3@tcp(localhost:3306)/Behisebe")

	return db, err

}

func fetchAllUsers(db *sql.DB) {
	results, err := db.Query("SELECT ID FROM User")
	if err != nil {
		panic(err.Error()) // proper error handling instead of panic in your app

	}

	for results.Next() {
		var userId models.User
		// for each row, scan the result into our tag composite object
		err = results.Scan(&userId.Id)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		fmt.Printf(userId.Id)
	}

}

func main() {
	fmt.Println("Go MySQL Tutorial")
	db, err := connectDB()
	// if there is an error opening the connection, handle it
	if err != nil {
		fmt.Println(err.Error())
	}

	// defer the close till after the main function has finished
	// executing
	defer db.Close()
	fmt.Println("Connected")
	// bajk := models.Bank{Id: "TEST"}
	// fmt.Print(bajk)
	// fetchAllUsers(db)

	results, err := db.Query("SELECT ID FROM User")
	if err != nil {
		fmt.Println("ERROR")
		fmt.Println(err.Error()) // proper error handling instead of panic in your app

	}

	for results.Next() {
		var userId models.User
		// for each row, scan the result into our tag composite object
		err = results.Scan(&userId.Id)
		if err != nil {
			panic(err.Error()) // proper error handling instead of panic in your app
		}
		// and then print out the tag's Name attribute
		// fmt.Printf(string(userId))
		fmt.Printf("%+v\n", userId)

	}

}
