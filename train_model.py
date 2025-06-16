import tensorflow as tf
from tensorflow.keras import layers, models
import os

IMG_SIZE = (224, 224)
BATCH_SIZE = 32
EPOCHS = 5

train_dir = "dataset/train"
val_dir = "dataset/validation"
test_dir = "dataset/test"

train_ds = tf.keras.preprocessing.image_dataset_from_directory(train_dir, image_size=IMG_SIZE, batch_size=BATCH_SIZE)
val_ds = tf.keras.preprocessing.image_dataset_from_directory(val_dir, image_size=IMG_SIZE, batch_size=BATCH_SIZE)

model = models.Sequential([
    layers.Rescaling(1./255, input_shape=(224, 224, 3)),
    layers.Conv2D(32, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Conv2D(64, 3, activation='relu'),
    layers.MaxPooling2D(),
    layers.Flatten(),
    layers.Dense(128, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(train_ds, validation_data=val_ds, epochs=EPOCHS)

os.makedirs("models", exist_ok=True)
model.save("models/model.h5")
