import psycopg2
import requests
import json

def main():

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

    mlbRequest = requests.get(url="http://site.api.espn.com/apis/site/v2/sports/baseball/mlb/teams?limit=30")
    mlbData = mlbRequest.json()
    mlbTeams = mlbData["sports"][0]["leagues"][0]["teams"]

    for teamObj in mlbTeams:
        team = teamObj["team"]
        cursor.execute(
            'INSERT INTO "Teams" ("Name", "Abbreviation", "Location", "SportId") VALUES (%s, %s, %s, %s)',
            [team["name"], team["abbreviation"].lower(), team["location"], "2"]
        )

    nflRequest = requests.get(url="http://site.api.espn.com/apis/site/v2/sports/football/nfl/teams?limit=32")
    nflData = nflRequest.json()
    nflTeams = nflData["sports"][0]["leagues"][0]["teams"]

    for teamObj in nflTeams:
        team = teamObj["team"]
        try:
            name = team["name"]
        except:
            name = "Football Team"
            #Fuck Dan Snyder

        cursor.execute(
            'INSERT INTO "Teams" ("Name", "Abbreviation", "Location", "SportId") VALUES (%s, %s, %s, %s)',
            [name, team["abbreviation"].lower(), team["location"], "3"]
        )

    nhlRequest = requests.get(url="http://site.api.espn.com/apis/site/v2/sports/hockey/nhl/teams?limit=32")
    nhlData = nhlRequest.json()
    nhlTeams = nhlData["sports"][0]["leagues"][0]["teams"]

    for teamObj in nhlTeams:
        team = teamObj["team"]

        cursor.execute(
            'INSERT INTO "Teams" ("Name", "Abbreviation", "Location", "SportId") VALUES (%s, %s, %s, %s)',
            [team["name"], team["abbreviation"].lower(), team["location"], "4"]
        )

    nbaRequest = requests.get(url="http://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams?limit=30")
    nbaData = nbaRequest.json()
    nbaTeams = nbaData["sports"][0]["leagues"][0]["teams"]

    for teamObj in nbaTeams:
        team = teamObj["team"]

        cursor.execute(
            'INSERT INTO "Teams" ("Name", "Abbreviation", "Location", "SportId") VALUES (%s, %s, %s, %s)',
            [team["name"], team["abbreviation"].lower(), team["location"], "5"]
        )

    # Commit changes
    connection.commit()

    

if __name__ == "__main__":
    main()