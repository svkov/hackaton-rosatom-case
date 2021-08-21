from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm.session import Session

from web.db import SessionLocal, engine
from pydantic import BaseModel
import web.models as models
import aiofiles


models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post('/api/uploadfile')
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)): # noqa
    path = 'data/' + file.filename
    async with aiofiles.open(path, 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)  # async write

    model_file = models.File(path=path)
    db.add(model_file)
    db.commit()
    return {'file_id': model_file.id}


def model_call():
    return 'ГОТОВЫЙ ПРОТОКОЛ'


@app.get('/api/predict/{id}')
async def get_predict(id: int):
    result = model_call()
    return {'text': result}