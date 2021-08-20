from fastapi import FastAPI

from web.db import engine
import web.models as models

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}
