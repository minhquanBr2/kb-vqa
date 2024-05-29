# conda base image
FROM continuumio/miniconda3

# set the working directory in the container
WORKDIR /app

# copy the current directory contents into the container at /app
COPY environment.yml /app/

# update 
RUN apt-get update && apt-get install -y libgl1-mesa-glx

# install the conda environment
RUN conda env create -f environment.yml

# ensure the environment is activated every time starting a new shell session
RUN echo "source activate kbvqa-server" > ~/.bashrc
ENV PATH /opt/conda/envs/kbvqa-server/bin:$PATH

# Copy the rest of the application files into the container
COPY /app/ /app/

# make port 8001 available to the world outside this container
EXPOSE 8001

# run the application
CMD ["bash", "-c", "source ~/.bashrc && uvicorn main:app --host 0.0.0.0 --port 8001"]
