package main

import (
	"database/sql"
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
)

type Contact struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Gender   string `json:"gender"`
	Location string `json:"location"`
	Email    string `json:"email"`
	Phone    string `json:"phone"`
	Dob      string `json:"dob"`
	Photo    string `json:"photo"`
	Role     string `json:"role"`
}

var db *sql.DB

func main() {
	var err error
	// Connect to the task database
	connStr := "user=postgres dbname=task host=db password=rubini sslmode=disable"
	db, err = sql.Open("postgres", connStr)
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	router := mux.NewRouter()
	router.HandleFunc("/api/contact", getContacts).Methods("GET")

	log.Println("Server started at :8000")
	http.ListenAndServe(":8000", router)
}

func getContacts(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*") // Enable CORS

	var contacts []Contact
	rows, err := db.Query("SELECT id, name, gender, location, email, phone, dob, photo, role FROM contact")
	if err != nil {
		http.Error(w, "Error fetching contacts", http.StatusInternalServerError)
		log.Printf("Database query error: %v\n", err)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var contact Contact
		// Scan the row into the contact struct
		if err := rows.Scan(&contact.ID, &contact.Name, &contact.Gender, &contact.Location, &contact.Email, &contact.Phone, &contact.Dob, &contact.Photo, &contact.Role); err != nil {
			http.Error(w, "Error scanning rows", http.StatusInternalServerError)
			log.Printf("Row scan error: %v\n", err)
			return
		}
		log.Printf("Fetched contact: %+v\n", contact) // Debugging
		contacts = append(contacts, contact)
	}

	json.NewEncoder(w).Encode(contacts)
}