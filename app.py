from flask import Flask, request
from flask_cors import CORS

from predict import prepare_data, predict
import pandas as pd

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def data():
    # Get JSON data from the request
    data = request.get_json()

    # Convert the data to a pandas DataFrame
    df = pd.DataFrame([data])
    data = prepare_data(df)
    pred = predict(data)

    return "You are diagnosed with Diabetes" if pred else "You are not diagnosed with diabetes"


if __name__ == '__main__':
    app.run(debug=True)
