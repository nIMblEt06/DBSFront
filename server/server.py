from flask import Flask, request, jsonify
import mysql.connector
from datetime import datetime
import json

now = datetime.now()

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="sr129",
    database="DBMS_Project"
)

mycursor = mydb.cursor()

app = Flask(__name__)


@app.route('/sendDetails', methods=['POST'])
def sendDetails():
    # res = request.data.decode('utf-8')
    res = json.loads(request.data)
    print(res['formInfo'])

    c_name = res['formInfo']["name"]
    email = res['formInfo']["email"]
    mobile = res['formInfo']["phone"]
    customerType = res['customerFormType']
    print(customerType)
    if (customerType == 'one'):
        name_formula = "INSERT into CUSTOMER(c_name, email, phone_number) VALUES( %s , %s , %s)"
        mycursor.execute(name_formula, (c_name, email, mobile))
        mydb.commit()
        show = 'SELECT customer_id FROM CUSTOMER ORDER BY customer_id DESC LIMIT 1'
        mycursor.execute(show)
        print(mycursor.fetchall())
        return 'works'


@app.route('/help')
def helpMe():
    return 'sup bro'


if __name__ == "__main__":
    app.run(port=9000, debug=False)
