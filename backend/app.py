from fastapi import FastAPI, HTTPException
from backend.database import db_connection
from fastapi.middleware.cors import CORSMiddleware
from backend.model import getCoin
import httpx
import sqlite3

app = FastAPI(title="pulse_dashboard")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/market")
async def get_coins():
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
            response.raise_for_status()
            return response.json()
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))

@app.post("/api/watchlist")
def save_coin(coin: getCoin):
    conn = db_connection()
    cur = conn.cursor()
    try:
        cur.execute("INSERT INTO watchlist (coin_id, symbol) VALUES (?, ?)", (coin.coin_id, coin.symbol))
        conn.commit()
        return {"id": cur.lastrowid, "coin_id": coin.coin_id, "symbol": coin.symbol}
    except sqlite3.IntegrityError:
        raise HTTPException(status_code=400, detail="Coin already in watchlist")
    finally:
        conn.close()

@app.get("/api/watchlist")
async def get_watchlist():
    conn = db_connection()
    cur = conn.cursor()
    try: 
        cur.execute("SELECT coin_id FROM watchlist")
        rows = cur.fetchall()
        
        if not rows:
            return [] 
        
        ids = ",".join([row["coin_id"] for row in rows])
        url = f"https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids={ids}"
        
        async with httpx.AsyncClient() as client:
            response = await client.get(url)
            response.raise_for_status()
            return response.json()
    except Exception as e:
        print(f"ERROR: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch watchlist")
    finally:
        conn.close()

@app.delete("/api/watchlist/{coin_id}")
def delete_coin(coin_id: str):
    conn = db_connection()
    cur = conn.cursor()

    try:
        cur.execute("DELETE FROM watchlist WHERE coin_id = ?", (coin_id,))
        conn.commit()
        return {"message": "Deleted successfully"}
    finally:
        conn.close()