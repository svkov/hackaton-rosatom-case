import re

import speech_recognition as sr
from moviepy.editor import VideoFileClip
from transformers import GPT2LMHeadModel, GPT2Tokenizer


def video_to_audio(mp4_file, wav_file):
    video = VideoFileClip(mp4_file)
    video.audio.write_audiofile(
        wav_file,
        fps=16000,
        nbytes=2,
        codec='pcm_s16le',
        ffmpeg_params=['-ac', '1', '-filter:a', 'atempo=1.1'],
        verbose=False, logger=None)
    video.close()


def speech_to_text(input_file, duration=70):
    '''
        input_file - directory of audiofile
        duration - selected video duration.
    '''
    r = sr.Recognizer()
    sample_audio = sr.AudioFile(input_file)
    with sample_audio as source:
        r.adjust_for_ambient_noise(source)
        audio = r.record(source, duration=duration)
    content = r.recognize_sphinx(audio, language='rus')
    content = re.sub(r'(\w+) \1', r'\1', content, flags=re.IGNORECASE)
    return content


def summarizate(content):
    model_name_or_path = "sberbank-ai/rugpt3small_based_on_gpt2"
    tokenizer = GPT2Tokenizer.from_pretrained(model_name_or_path)
    model = GPT2LMHeadModel.from_pretrained(model_name_or_path, pad_token_id=tokenizer.eos_token_id)
    input_ids = tokenizer.encode(content, return_tensors="pt")
    out = model.generate(input_ids, truncation=True)
    generated_text = list(map(tokenizer.decode, out))[0]
    return generated_text