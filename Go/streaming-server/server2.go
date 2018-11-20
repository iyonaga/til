package main

import (
	"bufio"
	"encoding/json"
	"fmt"
	"log"
	"math"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/labstack/echo"
	"github.com/labstack/echo/middleware"
)

func main() {
	lines := fromFile("data2.txt")

	e := echo.New()

	e.Use(middleware.LoggerWithConfig(middleware.LoggerConfig{
		Format: "method=${method}, uri=${uri}, status=${status}\n",
	}))

	e.POST("/", func(c echo.Context) error {
		c.Response().Header().Set(echo.HeaderContentType, echo.MIMEApplicationJSON)
		c.Response().WriteHeader(http.StatusOK)

		per_line := 500
		_start := time.Now()

		start := time.Now()
		// loop_count := 1
		idx_tmp := 0

		for idx, l := range lines {

			now := time.Now()
			const layout = "Mon Jan 2 15:04:05 -0700 MST 2006"
			fmt.Print(now.Format(layout))
			fmt.Print("\n")

			l = strings.Replace(l, "DATE_HERE", now.Format(layout), 1)

			if err := json.NewEncoder(c.Response()).Encode(l); err != nil {
				return err
			}

			elapsed_time := (time.Now().Sub(start)).Seconds()
			//fmt.Print(per_line * loop_count)
			//fmt.Print("\n")

			if elapsed_time < 1 {
				//if idx-idx_tmp > per_line*loop_count {

				if idx-idx_tmp > per_line {
					sleeping := math.Floor((1 - elapsed_time) * 1000)
					//fmt.Print(sleeping)
					time.Sleep(time.Duration(sleeping) * time.Millisecond)
					// loop_count++
					idx_tmp = idx
					start = time.Now()
				}
			} else {
				// loop_count++
				idx_tmp = idx
				start = time.Now()
			}

			//
			// if elapsed_time < 1 && idx > per_line*loop_count {
			// 	sleeping := math.Floor((1 - elapsed_time) * 100)
			// 	time.Sleep(time.Duration(sleeping) * time.Millisecond)
			// 	// fmt.Print("slleping...:")
			// 	// fmt.Print(sleeping)
			// 	// fmt.Print("\n")
			//
			// 	idx_tmp = idx
			// 	loop_count++
			//
			// 	start = time.Now()
			//
			// 	//time.Sleep(100 * time.Second)
			// }

			//fmt.Print(1 - time)
			//fmt.Print((time.Now().Sub(start)).Seconds())
			// if (time.Now().Sub(start)).Seconds() < 1) {
			// 		//time.sleep();
			// }

			c.Response().Flush()
			// time.Sleep(1 * time.Second)
		}

		end := time.Now()
		fmt.Printf("%f秒\n", (end.Sub(_start)).Seconds())

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
