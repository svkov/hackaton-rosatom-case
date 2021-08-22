from web.ml_script import speech_to_text, summarizate, video_to_audio
from fastapi import FastAPI, File, UploadFile, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm.session import Session
from starlette.responses import FileResponse

from web.db import SessionLocal, engine
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
async def upload_file(file: UploadFile = File(...), db: Session = Depends(get_db)):  # noqa
    path = 'data/' + file.filename
    async with aiofiles.open(path, 'wb') as out_file:
        content = await file.read()  # async read
        await out_file.write(content)  # async write

    model_file = models.File(path=path)
    db.add(model_file)
    db.commit()
    return {'file_id': model_file.id}


def model_call(file_id, db):
    path = db.query(File).filter_by(id=file_id).first().path
    wav_path = 'data/file.wav'
    video_to_audio(path, wav_path)
    content = speech_to_text(wav_path)
    return summarizate(content)
    # return 'эта речь прежде всего хочу ли впоследствии на втором этапе проекта управляющий'


@app.get('/api/predict/{id}')
async def get_predict(id: int, db: Session = Depends(get_db)):
    result = model_call(id, db)
    return {'text': result}


@app.get('/api/word')
async def get_word():
    media_type = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' # noqa
    return FileResponse('data/word.docx',
                        media_type=media_type,
                        filename='file.docx',
                        headers={
                            "Access-Control-Allow-Origin": "*",
                        })


@app.get('/api/pdf')
async def get_pdf():
    return FileResponse('data/pdf.pdf',
                        media_type='application/pdf',
                        filename='file.docx',
                        headers={
                            "Access-Control-Allow-Origin": "*",
                        })
