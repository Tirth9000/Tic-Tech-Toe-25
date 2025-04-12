from flask import Flask, request, session
from http import HTTPStatus
from flask_cors import CORS
import pandas as pd, json
import joblib, numpy as np
from pymongo import MongoClient
import pandasai as pai

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

client = MongoClient("mongodb://host.docker.internal:27018/")
db = client["test"]
collection = db["test_db"]


def execute_query(query=None, projection=None):
    query = query or {}
    result = list(collection.find(query, projection))
    return result


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

@app.route('/api/hello_world', methods=["GET"])
def SayHello():
    return "Hello world"


# @app.route('/upload-file', methods=['GET', 'POST'])
# def FileLoader(): 
#     data = request.json
#     query_data = execute_query(query)
#     session['file_address'] = query_data[0]["file"]
#     return json.dumps({'message': "session stored successfully!", "status": 200})

# @app.route('/chat-response', methods=['GET', 'POST'])
# def ChatResponse():
#     file_address = session.get('file_address')
#     df = pai.read_csv()
#     data = request.json
#     if data:
#         gen_response = df.chat(data+" And Provide the response as a single-line string statement instead of a structured format only.")
#         response = json.dumps({"response": str(gen_response), "type": 'text'})
#     else:
#         response = json.dumps({"response": "Data not found!", "type": 'error', "status": False})
#     return response
    

if __name__ == '__main__':
    # app.run(debug=True)
    app.run(host="0.0.0.0", port=5000)
    