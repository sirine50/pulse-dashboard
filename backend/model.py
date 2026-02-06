from pydantic import BaseModel

class getCoin(BaseModel):
    coin_id: str
    symbol: str