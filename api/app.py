from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
from translate import Translator
import os

app = Flask(__name__)
cors = CORS(app)

path = os.path.dirname(os.path.abspath(__file__))
translator = Translator(path, 'model24.pt')

@app.route("/translate", methods=['POST'])
@cross_origin()
def translate():
  content = request.json['text']
  trans = translator.translate(content)
  return jsonify({"translation": trans})

if __name__ == '__main__':
  app.run(host="0.0.0.0", port=5555)