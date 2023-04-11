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

            show = 'SELECT customer_id FROM CUSTOMER ORDER BY customer_id DESC LIMIT 1'
            print('Your Customer ID ')

            mycursor.execute(show)
            print(mycursor.fetchall())

        elif use == 2:

            print("Please enter Customer ID")
            c_id = int(input())
            opt_formula = 'SELECT * FROM BOOKING WHERE customer_id =' + \
                str(c_id) + ';'
            mycursor.execute(opt_formula)
            print(mycursor.fetchall())

        elif use == 3:

            print("Please enter customer ID")
            cus_id = int(input())
            print("Please enter Car type ID")
            car_type_id = int(input())
            print("Please enter pickup")
            pickup = input()
            print("Please enter dropoff")
            dropoff = input()
            print('Enter time in format YYYY-MM-DD HH:MM:SS')
            start_time = input()

            booking = 'INSERT INTO BOOKING(customer_id , car_type_id , pickup_location , dropoff_location ,start_time) VALUES(%s,%s,%s,%s,%s)'
            mycursor.execute(booking, (cus_id, car_type_id,
                             pickup, dropoff, start_time))
            mydb.commit()

        elif use == 4:

            print("Please enter Customer ID")
            c_id = int(input())
            print('Enter booking ID ')
            book_id = int(input())
            status_view = 'SELECT status FROM BOOKING WHERE booking_id = ' + \
                str(book_id)
            mycursor.execute(status_view)
            print(mycursor.fetchall())

        else:

            print('Enter booking ID')
            book_id = int(input())

            print('Enter rating')
            rate = int(input())
            print('Enter feedback')
            feedback = input()

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

            update_bill = 'UPDATE BOOKING SET status = "Ride Completed And Amount Paid" , rating =' + \
                str(rate) + ' , feedback = ' + feedback + \
                ' WHERE booking_id = ' + str(book_id)
            mycursor.execute(update_bill)
            mydb.commit()

    else:
        print('To finish Ride Press 1 \n To get available Press 2')
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

            newbook = 'update booking join (SELECT * FROM CAB WHERE car_id = ' + str(cab_id) + ')sub1 INNER JOIN (SELECT * FROM BOOKING WHERE booking.car_type_id = (SELECT cab.car_type_id FROM CAB WHERE car_id = ' + str(
                cab_id) + ') and BOOKING.status = "Waiting" LIMIT 1 )sub2 ON sub1.car_type_id = sub2.car_type_id set booking.status="Ongoing", booking.car_id = ' + str(cab_id) + ' where booking.car_type_id = (SELECT cab.car_type_id FROM CAB WHERE car_id = ' + str(cab_id) + ') limit 1;'

            avail_correction = 'UPDATE CAB SET availability = FALSE WHERE car_id = ' + \
                str(cab_id) + ' AND  count( SELECT * FROM BOOKING WHERE car_id = ' + \
                str(cab_id) + ' AND status = "Ongoing" ) = 1'

            mycursor.execute(endbook1)
            mycursor.execute(endbook2)
            mycursor.execute(endbook3)
            mycursor.execute(newbook)
            mycursor.execute(avail_correction)

            mydb.commit()

        if use == 2:
            print('Enter Cab ID')
            cab_id = int(input())

            avail = 'UPDATE cab SET availability = TRUE WHERE car_id = ' + \
                str(cab_id)

            newbook = 'update booking join (SELECT * FROM CAB WHERE car_id = ' + str(cab_id) + ')sub1 INNER JOIN (SELECT * FROM BOOKING WHERE booking.car_type_id = (SELECT cab.car_type_id FROM CAB WHERE car_id = ' + str(
                cab_id) + ') and BOOKING.status = "Waiting" LIMIT 1 )sub2 ON sub1.car_type_id = sub2.car_type_id set booking.status="Ongoing", booking.car_id = ' + str(cab_id) + ' where booking.car_type_id = (SELECT cab.car_type_id FROM CAB WHERE car_id = ' + str(cab_id) + ') limit 1;'

            avail_correction = 'UPDATE CAB SET availability = FALSE WHERE car_id = ' + \
                str(cab_id) + ' AND  count( SELECT * FROM BOOKING WHERE car_id = ' + \
                str(cab_id) + ' AND status = "Ongoing" ) = 1'

            mycursor.execute(avail)
            mycursor.execute(newbook)
            mycursor.execute(avail_correction)

            mydb.commit()


# This function for booking confirmation

        # wait_call = 'SELECT * FROM CAB where availablity = 1'
        # mycursor.execute(wait_call)

        # for x in mycursor :
        #     join = 'update booking join' + str(x) + ' on booking.car_type_id=CAB.car_type_id SET BOOKING.car_id = CAB.car_id, cab.availablity = false where cab.availablity=true;'

        # else :
        #     print("Please enter Customer ID")
        #     c_id = int(input())
        #     print("Enter pickup")
        #     pickup = input()
        #     print("Enter destination")
        #     dest = input()
        #     print("Enter start time")
        #     time = now.strftime('%Y-%m-%d %H:%M:%S')

        # pnpm i, pnpm run dev
