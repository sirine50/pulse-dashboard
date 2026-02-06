import axios from 'axios'

const api = axios.create({
    baseURL: 'http://127.0.0.1:8000'
})

export const marketapi = {
    getMarket: async () => {
        try {
            const response = await api.get("/api/market")
            return response.data
        } catch (error) {
            //throw error.response?.data?.detail || "Registration failed";
            throw error.response?.data?.detail || "failed to fetch the market"
        }
    },
    getWatchlist: async () => {
        try {
            const response = await api.get('/api/watchlist')
            return response.data
        } catch (error) {
            throw error.response?.data?.detail || "failed to get your watch list"
        }
    },
    addToWatchlist: async (coinData) => {
       try {
        // coinData should be { coin_id: "bitcoin", symbol: "btc" }
           const response = await api.post("/api/watchlist", coinData);
           return response.data;
       } catch (error) {
        // Improved error catching to see what the backend is complaining about
           const message = error.response?.data?.detail || "Failed to add coin";
           throw message;
       }
    },
    removeFromWatchlist: async (coin_id) => {
        try {
            const response = await api.delete(`/api/watchlist/${coin_id}`)
            return response.data
        } catch (error) {
            throw error.response?.data?.detail || "failed to delete the coin"
        }
    }
}