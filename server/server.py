from flask import Flask, request, jsonify
app = Flask(__name__)


@app.route("/sendDetails", methods=['POST'])
def sendDetails():
    

if __name__ == "__main__":
    app.run(debug=True)
