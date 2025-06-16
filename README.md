# Image Classifier Web App

## Features
- Train model to classify Cats vs Dogs.
- FastAPI backend to serve predictions.
- Flask frontend for image uploads.

## Setup
```bash
pip install -r requirements.txt
python train_model.py
uvicorn api:app --reload
python app.py
```

Visit: http://localhost:5000
