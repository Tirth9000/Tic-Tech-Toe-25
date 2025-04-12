from flask import Flask, Response, request
from http import HTTPStatus
from flask_cors import CORS
import pandas as pd, json
import joblib, numpy as np

app = Flask(__name__)
CORS(app)

# HTTP_STATUS = {
#     200: 'OK',
#     201: 'Created',
#     400: 'Bad Request',
#     401: 'Unauthorized',
#     403: 'Forbidden',
#     404: 'Not Found',
#     500: 'Internal Server Error',
# }

data = []
@app.route('/api/data_trends', methods=["POST", "GET"])
def DataTrends():
    try:
        response = request.get_json()
        data.extend(response['data'])
        df = pd.DataFrame(data)
        trends = json.loads(df.describe().to_json())
        return json.dumps({'trends_data': trends, "data": data, "status": HTTPStatus.OK})
    except Exception as e:
        return json.dumps({'message': str(e), 'status': HTTPStatus.NOT_FOUND})


@app.route('/api/predict_fail', methods=["POST", "GET"])
def PredictFailure():
    response = request.get_json()
    clf = joblib.load('new_random_forest_fault_detector.pkl')
    x = np.array(response["data"])
    print(x)
    print(type(x))
    y_pred = clf.predict(x.reshape(1,-1))
    y_prob = clf.predict_proba(x.reshape(1,-1))
    return json.dumps({"probable": y_prob[0].tolist(), "predict": int(y_pred[0]), "status": HTTPStatus.OK})


    

if __name__ == '__main__':
    app.run(debug=True)
    