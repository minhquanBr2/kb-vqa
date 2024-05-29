from fastapi import APIRouter, File, Form, UploadFile
from fastapi.responses import JSONResponse
from internal import vqa

router = APIRouter(
    prefix = '/vqa',
    tags = ['vqa'],
)

@router.post("/file")
def get_vlm_answers_from_file(question: str = Form(...), image: UploadFile = File(...)):
    header = {
        'Access-Control-Allow-Origin': '*'
    }
    response = vqa.get_vqa_answers_from_file(question, image)
    return JSONResponse(content=response, headers=header)

@router.post("/url")
def get_vlm_answers_from_url(data: dict):
    header = {
        'Access-Control-Allow-Origin': '*'
    }
    question = data['question']
    url = data['url']
    response = vqa.get_vqa_answers_from_url(question, url)
    return JSONResponse(content=response, headers=header)
