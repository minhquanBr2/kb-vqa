# source ~/miniconda3/etc/profile.d/conda.sh
# conda activate kbvqa-server
# # gunicorn main:app --workers 4 --preload --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8001 --timeout 300
# python -m uvicorn main:app --host 0.0.0.0 --port 8001 --reload