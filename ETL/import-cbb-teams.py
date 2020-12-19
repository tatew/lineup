import psycopg2
import requests
import json

conferences = [
    (2, "ACC"),
    (3, "A 10"),
    (46, "ASUN"),
    (1, "American East"),
    (62, "American"),
    (8, "Big 12"),
    (4, "Big East"),
    (5, "Big Sky"),
    (6, "Big South"),
    (7, "Big Ten"),
    (9, "Big West"),
    (11, "C-USA"),
    (10, "CAA"),
    (45, "Horizon"),
    (12, "Ivy"),
    (13, "MAAC"),
    (14, "MAC"),
    (16, "MEAC"),
    (18, "MVC"),
    (44, "Mountian West"),
    (19, "NEC"),
    (20, "OVC"),
    (21, "Pac-12"),
    (22, "Patriot"),
    (23, "SEC"),
    (26, "SWAC"),
    (24, "Southern"),
    (25, "Southland"),
    (49, "Summit"),
    (27, "Sun Belt"),
    (30, "WAC"),
    (29, "WCC")
]

def importTeams(groupId, cursor, name):
    request = requests.get(url=f"http://site.api.espn.com/apis/site/v2/sports/basketball/mens-college-basketball/teams?groups={groupId}")
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
            'INSERT INTO "Teams" ("Name", "Abbreviation", "Location", "SportId", "CBBConferenceId", "LogoUrl") VALUES (%s, %s, %s, %s, %s, %s)',
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

    cursor.executemany(
        'INSERT INTO "CBBConferences" ("Id", "Name") VALUES (%s, %s)',
        conferences
    )

    teams = 0
    for conf in conferences:
        print(f"Importing {conf[1]} Teams")
        teams += importTeams(conf[0], cursor, conf[1])
    print(f"{teams} total teams imported")

    connection.commit()

if __name__ == "__main__":
    main()