from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
import tensorflow as tf
from PIL import Image
import numpy as np
import io

app = FastAPI()
model = tf.keras.models.load_model("models/model.h5")
class_names = ["Cat", "Dog"]

def read_image(file) -> np.ndarray:
    image = Image.open(io.BytesIO(file)).convert("RGB")
    image = image.resize((224, 224))
    image_array = np.array(image) / 255.0
    return np.expand_dims(image_array, axis=0)

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    contents = await file.read()
    image = read_image(contents)
    prediction = model.predict(image)[0][0]
    label = class_names[int(prediction > 0.5)]
    confidence = float(prediction if prediction > 0.5 else 1 - prediction)
    return JSONResponse(content={"class": label, "confidence": round(confidence, 2)})
