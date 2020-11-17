import psycopg2
import requests
import json

fbsConferences = [
    (1, "ACC"),
    (151, "American"),
    (4, "Big 12"),
    (5, "Big Ten"),
    (12, "C-USA"),
    (18, "FBS Independant"),
    (15, "MAC"),
    (17, "Mountian West"),
    (9, "Pac-12"),
    (8, "SEC"),
    (37, "Sun Belt")
]

fcsConferences = [
    (20, "Big Sky"),
    (40, "Big South"),
    (48, "CAA"),
    (32, "FCS Independant"),
    (22, "Ivy"),
    (24, "MEAC"),
    (21, "MVFC"),
    (25, "NEC"),
    (26, "OVC"),
    (27, "Patriot"),
    (28, "Pioneer"),
    (31, "SWAC"),
    (29, "Southern"),
    (30, "Southland")
]

def importTeams(groupId, cursor, name):
    request = requests.get(url=f"http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams?groups={groupId}")
    data = request.json()
    teams = data["sports"][0]["leagues"][0]["teams"]

    teamsImported = 0

    for teamObj in teams:
        team = teamObj["team"]
        try:
            logo = team["logos"][0]["href"]
        except:
            logo = ""

        cursor.execute(
            'INSERT INTO "Teams" ("Name", "Abbreviation", "Location", "SportId", "ConferenceId", "LogoUrl") VALUES (%s, %s, %s, %s, %s, %s)',
            [team["name"], team["abbreviation"].lower(), team["location"], "4", f"{groupId}", logo]
        )
        teamsImported += 1
    
    print(f"{teamsImported} {name} teams imported")
    return teamsImported

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

    print("---Importing FBS---")
    print("Importing FBS Conferences")
    cursor.executemany(
        'INSERT INTO "CFBConferences" ("Id", "Name", "DivisonId") VALUES (%s, %s, 80)',
        fbsConferences
    )

    teams = 0
    for conf in fbsConferences:
        print(f"Importing {conf[1]} Teams")
        teams += importTeams(conf[0], cursor, conf[1])
    print(f"{teams} total FBS teams imported")

    print("---Importing FCS---")
    print("Importing FCS Conferences")
    cursor.executemany(
        'INSERT INTO "CFBConferences" ("Id", "Name", "DivisonId") VALUES (%s, %s, 81)',
        fcsConferences
    )

    fcsTeams = 0
    for conf in fcsConferences:
        print(f"Importing {conf[1]} Teams")
        fcsTeams += importTeams(conf[0], cursor, conf[1])
    print(f"{fcsTeams} total FCS teams imported")

    connection.commit()

if __name__ == "__main__":
    main()