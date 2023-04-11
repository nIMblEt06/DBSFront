from flask import Flask, request, jsonify
import mysql.connector
from datetime import datetime
import json

now = datetime.now()

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Mysqlnek",
    database="dbs_proj"
)

mycursor = mydb.cursor()

app = Flask(__name__)

if __name__ == "__main__":
    app.run(debug=True)


@app.route("/sendDetails", methods=['POST'])
def sendDetails():
    # res = request.data.decode('utf-8')
    res = json.loads(request.data)
    print(res['formInfo'])

    c_name = res['formInfo']["name"]
    email = res['formInfo']["email"]
    mobile = res['formInfo']["phone"]
    customerType = res['customerFormType']

    if (customerType == 'one'):
        name_formula = "INSERT into CUSTOMER(c_name, email, phone_number) VALUES(%s , %s , %s , %s)"
        mycursor.execute(name_formula, (c_name, email, mobile))
        mydb.commit()
        show = 'SELECT customer_id FROM CUSTOMER ORDER BY customer_id DESC LIMIT 1'
        mycursor.execute(show)
        print(mycursor.fetchall())
        return mycursor.fetchall()
