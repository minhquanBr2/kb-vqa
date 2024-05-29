# KBVQA (Knowledge-based VQA)

***Ask an image and get answers that go beyond what's visible.***

## Introduction

**Visual Question Answering (VQA)** is a task that involves providing accurate answers to questions based on the content of an image. However, most VQA approaches are limited to the information present in the image itself. They cannot infer answers that require knowledge beyond what is immediately observable. This limitation is a significant challenge, attracting many researchers who aim to enhance the accuracy and reasoning capabilities of VQA models from their diverse knowledge base.

In this project, I developed a simple web application called **KBVQA (Knowledge-based Visual Question Answering)**, which leverages the **BLIP-2** model, utilizing the **Flan T5-xxl** large language model, to provide answers beyond the visible details in an image.

## Technical Overview

### Model

**BLIP-2**, introduced in the paper [BLIP-2: Bootstrapping Language-Image Pre-training with Frozen Image Encoders and Large Language Models](https://arxiv.org/abs/2301.12597) by Li et al., consists of three components: a CLIP-like image encoder, a Querying Transformer (Q-Former), and a large language model. The image encoder and language model are initialized from pre-trained checkpoints and kept frozen during training. The Q-Former, a BERT-like Transformer encoder, maps a set of "query tokens" to query embeddings, bridging the gap between the image encoder and the language model. The model's goal is to predict the next text token based on the query embeddings and previous text.

### Backend

The backend of the **KBVQA** application is built with **FastAPI**, a modern web framework for building APIs with Python. **FastAPI** allows easy setup and deployment of API endpoints, handling image processing and interaction with the **BLIP-2** model to generate answers based on user queries.

### Frontend

The frontend of the **KBVQA** application is developed using **Vite** and **ReactJS**. **Vite** is a build tool that provides a faster and leaner development experience for modern web projects, while **ReactJS** is a popular JavaScript library for building user interfaces. This combination allows for a responsive and interactive user experience, enabling users to upload images, ask questions, and receive answers seamlessly.

### Packaging

The **KBVQA** application is packaged using **Docker** and **Docker Compose**. **Docker** automates the deployment of applications in containers, while **Docker Compose** manages multi-container applications. This setup ensures easy and consistent deployment across different environments.



## Installation

There are 2 separate applications: one for backend and one for frontend. After cloning this repo, you have to `cd` into each directory (`backend` and `frontend`) to install each application.

**Warning:** Due to high memory consumed by the model **BLIP-2 Flan T5-xxl** (~50GB), it is recommended that the `backend` app be installed on a virtual machine (**Google Cloud, AWS, DigitalOcean**, etc.) with a large amount of memory. On the other hand, the lightweight `frontend` app can be easily installed on a personal computer.

### **1. Install `Docker` and `Docker Compose` (both machines)**

If they are already installed then skip this step.

### **2. Clone the repository (both machines)**

```shell
   git clone https://github.com/minhquanBr2/kb-vqa.git
```

### **3. Build and run `backend` app**

```shell
   cd backend
   docker-compose build --no-cache
   docker-compose up
```
The `backend` app will be ran on port `8001`.


### **4. Build and run `frontend` app**

```shell
   cd frontend
```
After this step, remember the add `.env` below the `frontend` directory, add add this line with your own server IP.
```shell
   VITE_REACT_APP_SERVER_URL=http://<SERVER_IP>:8001
```
```shell
   docker-compose build --no-cache
   docker-compose up
```
We can use the app at `http://localhost:8080`. Please make sure that the machine hosting the `frontend` app has access to the `backend` app via the network or `SSH`.

**Note:** Add `sudo` before the shell command if you receive `Permission denied` error.

## Usage

Below is my application's user interface.

<img src="readme-markdown/ui-home.png">

The app supports 3 methods of sending images:
- Drag-and-drop
- Browse from file
- Paste URL

After being uploaded, the image is displayed with full resolution, with an editable text box for entering the question. Click `Submit` until the sample answer (or previous answer) is replaced by the current one. Note that `Submit` button is disabled while the query is being processed.

Here are some sample queries:

<img src="readme-markdown/query-citrus.png">
<img src="readme-markdown/query-chromosomes.png">
<img src="readme-markdown/query-firetrucks.png">



## Reference

