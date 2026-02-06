import sqlite3

DB_NAME = "app.db"

def db_connection():
    conn = sqlite3.connect(DB_NAME)
    
    conn.row_factory = sqlite3.Row

    return conn

def ini_db():
    conn = db_connection()

    cur = conn.cursor()
    cur.execute("""CREATE TABLE IF NOT EXISTS watchlist (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        coin_id TEXT NOT NULL UNIQUE,
        symbol TEXT 
    )""")

    

    conn.commit()
    conn.close()

if __name__ == "__main__":
    ini_db()
    print("db inisilized")