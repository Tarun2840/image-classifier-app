from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    prediction = None
    if request.method == "POST":
        file = request.files["file"]
        if file:
            response = requests.post("http://localhost:8000/predict", files={"file": file.read()})
            prediction = response.json()
    return render_template("index.html", prediction=prediction)

if __name__ == "__main__":
    app.run(debug=True)
