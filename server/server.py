from flask import Flask, request, jsonify
import mysql.connector
from datetime import datetime
import json

now = datetime.now()

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="sr129",
    database="DBMS_Project1"
)

mycursor = mydb.cursor()

app = Flask(__name__)


@app.route('/sendDetails', methods=['POST'])
def sendDetails():
    # res = request.data.decode('utf-8')
    res = json.loads(request.data)

    c_name = res['formInfo']["name"]
    c_id = res['formInfo']["id"]
    email = res['formInfo']["email"]
    mobile = res['formInfo']["phone"]
    book_id = res['formInfo']["bookId"]
    customerType = res['customerFormType']
    if (customerType == 'one'):
        name_formula = "INSERT into CUSTOMER(c_name, email, phone_number) VALUES( %s , %s , %s)"
        mycursor.execute(name_formula, (c_name, email, mobile))
        mydb.commit()
        show = 'SELECT customer_id FROM CUSTOMER ORDER BY customer_id DESC LIMIT 1'
        mycursor.execute(show)
        print(mycursor.fetchall())
        return 'Done'
    if (customerType == 'two'):
        opt_formula = 'SELECT * FROM BOOKING WHERE customer_id =' + \
            str(c_id) + ';'
        mycursor.execute(opt_formula)
        details = mycursor.fetchall()
        print(details)
        return details
    if (customerType == 'four'):
        status_view = 'SELECT status FROM BOOKING WHERE booking_id = ' + \
            str(book_id)
        mycursor.execute(status_view)
        details = mycursor.fetchall()
        print(details)
        return details


if __name__ == "__main__":
    app.run(port=9000, debug=False)
