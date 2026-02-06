# ⚡ PULSE | Crypto Dashboard

A high-performance Fintech dashboard built with **FastAPI** and **React (Vite)**. Tracks real-time crypto prices via CoinGecko and allows users to manage a personal watchlist.

## 🚀 Features
* **Live Market Data:** Fetches top 10 coins with real-time price updates.
* **Watchlist:** Save coins to a local SQLite database and track them separately.
* **Search:** Instant filtering of assets.
* **Cyber-Tech UI:** Dark mode aesthetic with Tailwind CSS and Lucide icons.

## 🛠️ Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Axios, Lucide-React.
- **Backend:** Python, FastAPI, HTTPX.
- **Database:** SQLite3.

## ⚙️ Setup

### Backend
1. `cd backend`
2. `python -m venv venv`
3. `source venv/bin/activate` (or `venv\Scripts\activate` on Windows)
4. `pip install fastapi uvicorn httpx`
5. `uvicorn app:app --reload`

### Frontend
1. `npm install`
2. `npm run dev`

---
*Built during Winter Break 2026*