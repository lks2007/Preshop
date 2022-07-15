package main

import (
	"database/sql"
	"fmt"
	"html/template"
	"net/http"
	"strconv"

	_ "github.com/lib/pq"
)

func redirectTLS(w http.ResponseWriter, r *http.Request) {
    http.Redirect(w, r, "https://172.22.2.15:443"+r.RequestURI, http.StatusMovedPermanently)
}

type Page struct{
	Content map[int]map[string]string
	Search string
	IsSearch bool
}

const (
	host     = "127.0.0.1"
	port     = 5432
	user     = "webhost"
	password = "webhost"
	dbname   = "webhost"
)
  
func checkErr(err error){
	if err != nil {
  	  panic(err)
  	}
}

func connectDb() (*sql.DB){
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
    "password=%s dbname=%s sslmode=disable",
    host, port, user, password, dbname)
  	db, err := sql.Open("postgres", psqlInfo)

  	checkErr(err)
  	err = db.Ping()
	checkErr(err)

	return db
}

func showAllObject(db *sql.DB) (map[int]map[string]string){
	rows, err := db.Query("SELECT * FROM preshop;")
	checkErr(err)
 
	i := 0
	element := make(map[int]map[string]string)

	defer rows.Close()
	for rows.Next() {
		var id int
		var name string
		var img string
		var categories int
		var price int
	
		err = rows.Scan(&id, &name, &img, &categories, &price)
		checkErr(err)
		
		element[i] = make(map[string]string)
		element[i]["id"] = strconv.Itoa(id)
		element[i]["name"] = name
		element[i]["img"] = img
		element[i]["categories"] = strconv.Itoa(categories)
		element[i]["price"] = strconv.Itoa(price)

		i += 1
	}

	return element
}

func indexHandler(w http.ResponseWriter, r *http.Request){
	db := connectDb()
	
	p := Page{showAllObject(db), "null", false}

    t := template.New("Index")
    t = template.Must(t.ParseFiles("tmpl/index.tmpl", "tmpl/content.tmpl"))

    err := t.ExecuteTemplate(w, "index", p)
	checkErr(err)

	defer db.Close()
}

func main(){
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./src"))))
	http.HandleFunc("/", indexHandler)

	http.ListenAndServeTLS(":443", "server.crt", "server.key", nil)
}