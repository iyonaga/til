package main

import (
	"bufio"
	"encoding/json"
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo"
)

func main() {
	lines := fromFile("data2.txt")

	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
		c.Response().WriteHeader(http.StatusOK)
		for _, l := range lines {
			if err := json.NewEncoder(c.Response()).Encode(l); err != nil {
				return err
			}
			c.Response().Flush()
			//time.Sleep(1 * time.Second)
		}
		return nil
	})
	e.Logger.Fatal(e.Start(":1323"))
}

func fromFile(filePath string) []string {
	f, err := os.Open(filePath)
	if err != nil {
		log.Fatal(err)
	}

	defer f.Close()

	lines := []string{}
	// lines := make([]string, 0, 4)
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}

	if serr := scanner.Err(); serr != nil {
		log.Fatal(serr)
	}

	return lines
}
