import setup
from PIL import Image
import torch
from io import BytesIO
import requests

def get_answers(prompt, processed_image):
    with torch.no_grad():
        answers = setup.blip2_model.generate(
            {"image": processed_image, "prompt": prompt}, 
            use_nucleus_sampling=True, 
            num_captions=1,    
            temperature=0.8, 
            top_p=0.9
        )   
        return answers


def get_vqa_answers_from_file(question, image):

    print(f"Generating answers for question: {question}")

    # prepare data
    file_content = image.file.read()
    raw_image = Image.open(BytesIO(file_content)).convert('RGB')
    prompt = f"Question: {question} Answer:"
    print("Image of type: ", type(raw_image))
    print("Image size: ", raw_image.size)

    # process image
    with torch.no_grad():
        processed_image = setup.blip2_vis_processors["eval"](raw_image).unsqueeze(0).to(setup.device)
        print(type(processed_image))
        print(processed_image.size())

    # generate answers    
    answers = get_answers(prompt, processed_image)     
    print("Answers: ", answers)
    return {"message": "success", "response": answers}



def get_vqa_answers_from_url(question, url):

    print(f"Generating answers for question: {question}")

    # prepare data
    raw_image = Image.open(requests.get(url, stream=True).raw).convert('RGB')
    prompt = f"Question: {question} Answer:"
    print("Image of type: ", type(raw_image))
    print("Image size: ", raw_image.size)

    # process image
    with torch.no_grad():
        processed_image = setup.blip2_vis_processors["eval"](raw_image).unsqueeze(0).to(setup.device)
        print(type(processed_image))
        print(processed_image.size())

    # generate answers    
    answers = get_answers(prompt, processed_image)     
    print("Answers: ", answers)
    return {"message": "success", "response": answers}

