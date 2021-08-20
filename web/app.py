from fastapi import FastAPI, File, UploadFile

from web.db import engine
from pydantic import BaseModel
import web.models as models


models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post('/api/uploadfile')
async def upload_file(file: UploadFile = File(...)):
    print(file.filename)
    return {'file': file.filename}
