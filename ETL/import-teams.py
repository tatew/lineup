import psycopg2
import requests
import json

def main():

    mlbRequest = requests.get(url="http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams?limit=30")
    data = mlbRequest.json()
    mlbTeams = data["sports"][0]["leagues"][0]["teams"]

    server="db"
    username="lineup_user"
    password="wj3Kh2LG9n9pL"
    database="lineup"
    connection = psycopg2.connect(user = username,
                                    password = password,
                                    host = server,
                                    port = "5432",
                                    database = database)
    cursor = connection.cursor()

    for teamObj in mlbTeams:
        team = teamObj["team"]
        cursor.execute(
            'INSERT INTO "Teams" ("Name", "Abbreviation", "Location", "SportId") VALUES (%s, %s, %s, %s)',
            [team["name"], team["abbreviation"], team["location"], "2"]
        )

    # Commit changes
    connection.commit()

    

if __name__ == "__main__":
    main()