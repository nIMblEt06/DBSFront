import mysql.connector
from datetime import datetime

now = datetime.now()

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="Mysqlnek",
    database="dbs_proj"
)

mycursor = mydb.cursor()

# @app.route("/usertype", methods=['POST'])
# def user():
#     user_type = request.form.get('user_type')
#     if user_type == "customer":

exit = 1
while (exit):
    print("Welcome to Cab Booking Service")
    print("Press : 1 for Customer \nPress : 2 for Cab Driver Access ")
    user = int(input())

    if user == 1:
        print("Hello Customer \n For new customer registration, Press 1 \n For previous bookings, Press 2 \n For new booking, Press 3 \n For viewing status of booking, Press 4 \n For bill payment, Press 5")
        use = int(input())

        if use == 1:
            print("Please enter first name")
            fname = input()
            print("Please enter last name")
            lname = input()
            print("Please enter email")
            email = input()
            print("Please enter phone number")
            mobile = input()

            name_formula = "INSERT into CUSTOMER(first_name, last_name, email, phone_number) VALUES(%s , %s , %s , %s)"
            mycursor.execute(name_formula, (fname, lname, email, mobile))
            mydb.commit()

        elif use == 2:

            print("Please enter Customer ID")
            c_id = int(input())
            opt_formula = 'SELECT * FROM BOOKING WHERE customer_id =' + \
                str(c_id) + ';'
            mycursor.execute(opt_formula)
            print(mycursor.fetchall())

        # else:
        #

        elif use == 4:

            print("Please enter Customer ID")
            c_id = int(input())
            print('Enter booking ID')
            book_id = int(input())

            status_view = 'SELECT status FROM BOOKING WHERE booking_id = ' + \
                str(book_id)
            mycursor.execute(status_view)
            print(mycursor.fetchall())

        else:

            print('Enter booking ID')
            book_id = int(input())

            # setting payment id and booking id to same value since they exhibit foreign key relationship

            pay_id = book_id

            bill_view = 'SELECT bill FROM BOOKING WHERE booking_id = ' + \
                str(book_id)
            mycursor.execute(bill_view)
            amount = mycursor.fetchall()
            print('Enter payment method')
            pay_method = input()
            amount = mycursor.fetchone()

            pay_func = 'INSERT INTO PAYMENT( booking_id , payment_method) VALUES(%s , %s)'
            mycursor.execute(pay_func, (book_id, pay_method))
            mydb.commit()

            amount_update = 'UPDATE PAYMENT SET amount = ( SELECT bill from BOOKING where BOOKING.booking_id = ' + str(
                book_id) + ' ) WHERE PAYMENT.booking_id = ' + str(book_id) + ';'
            mycursor.execute(amount_update)
            mydb.commit()

            update_bill = 'UPDATE BOOKING SET status = "Ride Completed And Amount Paid" where booking_id = ' + \
                str(book_id)
            mycursor.execute(update_bill)
            mydb.commit()

    else:
        print('To finish Ride Press 1')
        use = int(input())

        if use == 1:
            print('Enter Cab ID')
            cab_id = int(input())
            print('Enter booking ID')
            book_id = int(input())
            print('Enter time in format YYYY-MM-DD HH:MM:SS')
            time_end = input()
            print('Enter ride duration')
            t = float(input())

            endbook1 = 'UPDATE Cab SET availablity= 1 WHERE car_id = ' + \
                str(cab_id) + ';'
            endbook2 = 'UPDATE Booking SET status = "Completed" , end_time = ' + \
                time_end + ' , hour_count = ' + str(t) + \
                ' WHERE booking_id = ' + str(book_id) + ';'

            endbook3 = ' UPDATE Booking inner join CAR_TYPE on booking.car_type_id = CAR_TYPE.car_type_id SET bill = hour_count * CAR_TYPE.hourly_rate WHERE booking_id = ' + \
                str(cab_id) + ';'

            mycursor.execute(endbook1)
            mycursor.execute(endbook2)
            mycursor.execute(endbook3)
            mydb.commit()

        # else :
        #     print("Please enter Customer ID")
        #     c_id = int(input())
        #     print("Enter pickup")
        #     pickup = input()
        #     print("Enter destination")
        #     dest = input()
        #     print("Enter start time")
        #     time = now.strftime('%Y-%m-%d %H:%M:%S')
