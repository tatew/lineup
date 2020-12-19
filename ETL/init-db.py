import psycopg2

sports = [
    ("MLB", "baseball/mlb"),
    ("NFL", "football/nfl"),
    ("NBA", "basketball/nba"),
    ("CFB", "football/college-football"),
    ("NHL", "hockey/nhl"),
    ("CBB", "basketball/mens-college-basketball")
]

divisions = [
    (80, "FBS"),
    (81, "FCS")
]

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

    cursor.execute(
        'INSERT INTO "Users" ("FirstName", "LastName", "Email", "Password") VALUES (%s, %s, %s, %s)',
        ["Tate", "Wilhelm", "tatew@vt.edu", "test"]
    )

    cursor.executemany(
        'INSERT INTO "Sports" ("Name", "Url") VALUES (%s, %s)',
        sports
    )

    cursor.executemany(
        'INSERT INTO "CFBDivisions" ("Id", "Name") VALUES (%s, %s)',
        divisions
    )

    connection.commit()    


if __name__ == "__main__":
    main()