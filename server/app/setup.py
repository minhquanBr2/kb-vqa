from lavis.models import load_model_and_preprocess
import torch
from torch import hub

# General
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# BLIP2 - vqa
blip2_model_name = "blip2_t5"
blip2_model_type = "pretrain_flant5xxl"
# blip2_model_name = "blip2_opt"
# blip2_model_type = "pretrain_opt2.7b"
hub.set_dir("../.cache/huggingface/hub")
print("Loading BLIP2 model...")
blip2_model, blip2_vis_processors, _ = load_model_and_preprocess(name=blip2_model_name, model_type=blip2_model_type, is_eval=True, device=device)  
print("BLIP2 model loaded.")