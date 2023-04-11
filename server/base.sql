
--------- WRITING TABLES ----------


CREATE TABLE CUSTOMER (
    customer_id INT AUTO_INCREMENT PRIMARY KEY ,

    --- Earlier code consisted of these which were later changed due to 1NF Normalisation

    -- first_name VARCHAR(50) NOT NULL,
    -- last_name VARCHAR(50) NOT NULL,

    name VARCHAR(100) NOT NULL ,
    email VARCHAR(100) NOT NULL,

    -- it has been assumed that different people can have the same emailid and phone number

    phone_number VARCHAR(20) NOT NULL

    
);





CREATE TABLE DRIVER (
    driver_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,

    -- driver_password VARCHAR(12) NOT NULL,

     --- Earlier code consisted of these which were later changed due to 1NF Normalisation

    -- first_name VARCHAR(50) NOT NULL,
    -- last_name VARCHAR(50) NOT NULL,

    driver_name VARCHAR(50) NOT NULL,

    license_number VARCHAR(50) NOT NULL,

    -- license number is also a candidate key

    phone_number VARCHAR(20) NOT NULL,
    -- it has been assumed that different people can have the same emailid and phone number


    money_earned INT DEFAULT 0

    -- reason_unavailablity VARCHAR(50)
    -- CONSTRAINT DRIVER_PK PRIMARY KEY(driver_id)
);





CREATE TABLE CAR_TYPE (

    car_type_id INT PRIMARY KEY,

    type_name VARCHAR(50) NOT NULL,

    -- type_name is also candidate key as type_name determines the type id
    -- hatchback - 1
    -- sedan - 2
    -- suv - 3

    hourly_rate DECIMAL(5, 2) NOT NULL,

    mileage_rate DECIMAL(5, 2) NOT NULL
);





CREATE TABLE CAB (

    car_id INT AUTO_INCREMENT PRIMARY KEY,

    car_name VARCHAR(30) NOT NULL,

    car_type_id INT NOT NULL,

    plate_number VARCHAR(20) NOT NULL,
    -- plate number - candidate key

    driver_id INT NOT NULL,
    -- driver_id also candidate key as 1:1 Cardinality in cab and driver

    availablity BOOLEAN NOT NULL ,

    FOREIGN KEY (car_type_id) REFERENCES CAR_TYPE(car_type_id),

    FOREIGN KEY (driver_id) REFERENCES DRIVER(driver_id)
);





-- CREATE TABLE BOOKING_WAIT (
--     booking_id INT AUTO_INCREMENT PRIMARY KEY,
--     customer_id INT NOT NULL,
--     pickup_location VARCHAR(100) NOT NULL,
--     dropoff_location VARCHAR(100) NOT NULL,
--     start_time DATETIME NOT NULL,
--     end_time DATETIME,
--     hour_count INT,
--     status VARCHAR(20) NOT NULL,
--     -- rating INT,
--     -- feedback VARCHAR(500),
--     -- bill INT,
--     FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id),
--     FOREIGN KEY (car_id) REFERENCES CAR(car_id)
-- );





CREATE TABLE BOOKING (
    booking_id INT AUTO_INCREMENT PRIMARY KEY,
    car_type_id INT NOT NULL ,
    customer_id INT NOT NULL,
    car_id INT,
    pickup_location VARCHAR(100) NOT NULL,
    dropoff_location VARCHAR(100) NOT NULL,
    start_time DATETIME NOT NULL,
    -- end_time DATETIME,
    hour_count INT,
    status VARCHAR(70) NOT NULL DEFAULT 'Waiting',
    rating INT,
    feedback VARCHAR(500),
    bill INT,
    transaction_status VARCHAR(20) DEFAULT 'N/A',
    FOREIGN KEY (customer_id) REFERENCES CUSTOMER(customer_id),
    FOREIGN KEY (car_id) REFERENCES CAB(car_id)
);





CREATE TABLE PAYMENT (

    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    booking_id INT NOT NULL,
    -- booking id also candidate key

    amount DECIMAL(8, 2) DEFAULT 0.0 ,
    payment_method VARCHAR(20) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES BOOKING(booking_id)
);




--------    WRTING QUERIES    -----------


-- Query1 / TRAYAMBAK
INSERT INTO DRIVER (first_name, last_name, driver_password, license_number, phone_number)
VALUES ('Cardinal', 'Erichsen', 'switzerland', 'RAJ001' , '65566'),
       ('Nek', 'Man', 'japan', 'CDG001' , '64566'),
       ('Om', 'Kota', 'korea', 'RAJ002' , '65266'),
       ('Naman', 'Shethia', 'india', 'CHS001' , '68866'),
       ('Sidd', 'Sharma', 'pakistan', 'CHS002' , '63336'),
       ('Anurag', 'Bitsh', 'afghanistan', 'CHS003' , '64446'),
       ('Nach', 'Nalin', 'ireland', 'BR001' , '69996'),
       ('Vikram', 'Bhata', 'iceland', 'DL001' , '65556'),
       ('Tram', 'Shrivatsava','france','BR002' , '60006') ,
       ('Dev' , 'Parekh','northkorea','DL002','69696');


-- Query2 / Nek
insert into CUSTOMER(first_name,last_name,email,phone_number)
VALUES  ('prabhnoor','singh','prabhnoor02@gmail.com','9088443275'),
        ('nakul','rana','nakul@gmail.com','9955885555'),
        ('isha','joshi','isha@gmail.com','9955251222'),
        ('aryan','kumar','aryan@gmail.com','9955412111'),
        ('shobhit','rathi','shobhit@gmail.com','9955223522'),
        ('pratham','bera','pratham@gmail.com','9955321200'),
        ('jatin','gupta','jatin@gmail.com','9955824200'),
        ('devansh','sharma','devansh@gmail.com','9955220077'),
        ('rahul','kumar','rahul@gmail.com','9955145155'),
        ('mohan','pandey','mohan@gmail.com','9955647135'),
        ('Ravi' , 'shankar' ,'ravi.shankar@gmail.com' , '9696966666') 
        ('Vaibhav' , 'Singla' , 'vaibha.singla@gmail.com' , '6969696999');


 -- Query3 / TRAYAMBAK 
 INSERT INTO CAR_TYPE(type_name , car_type_id , hourly_rate , mileage_rate)
 VALUES ('Hatchback' , 1 ,50.00 , 15.50) ,
        ('Sedan' , 2 , 75.00 , 18.75) ,
        ('SUV' , 3 , 100 , 20.50) ;

INSERT INTO CAB(car_type_id , car_name , plate_number , driver_id) 
VALUES (1 , 'TATA NANO' , 'RAJ0001' , 1) ,
       (2 , 'HONDA CITY' , 'RAJ0002' , 2) ,
       (1 , 'MARUTI ALTO' , 'RAJ003' , 3) ,
       (3 , 'ROLLS ROYCE CULLINAN' , 'RAJ004' , 4) ,
       (1 , 'MARUTI 800' , 'RAJ005' , 5) ,
       (1 , 'MARUTI WAGON-R' , 'RAJ006' , 6) ,
       (3 , 'MAHINDRA BOLERO' , 'RAJ007' , 7) ,
       (2 , 'MARUTI SWIFT DZIRE' , 'RAJ008' , 8) ,
       (3 , 'RANGEROVER' , 'RAJ0009' , 9) ,
       (2 , 'HYUNDAI VERNA' , 'RAJ0010' , 10) ;




--- POPULATING WAITLIST AND BOOKING AND FREEING OF DRIVER TO TEST APPLICATION ---

INSERT INTO BOOKING (customer_id , pickup_location , dropoff_location, start_time , car_type_id)
VALUES (1 ,'delhi' , 'patna','2023-04-09 18:00:00' , 1) ,
       (2 , 'bhilai' , 'mughalsarai','2023-04-08 20:00:00' , 2) ,
       (3 , 'chandigarh' , 'patna','2023-04-10 08:00:00' ,  3) ,
       (4 , 'delhi' , 'leh','2023-04-09 14:00:00' , 2) ,
       (5 , 'leh' , 'ladakh','2023-04-09 16:00:00' , 1 ) ,
       (6 , 'mohali' , 'bilaspur','2023-04-11 18:00:00' , 3) ,
       (7 , 'goa' , 'mumbai','2023-04-10 12:00:00' , 1) ,
       (8 , 'trivandrum' , 'goa','2023-04-09 18:00:00' , 2) ,
       (9 , 'kolkata' , 'pune','2023-04-11 08:00:00' , 3) ,
       (10 , 'kota' , 'ajmer','2023-04-09 15:00:00' , 2) ,
       (11 , 'jaipur' , 'hisar','2023-04-10 21:00:00' , 1) ;
       ---- END OF POPULATION ----





-- Query4 / Nek 

UPDATE CAB
SET availablity=FALSE
WHERE driver_id = 1;
--wrong

-- update cab, booking 
-- inner join booking on booking.car_type_id=cab.car_type_id
-- set availablity = FALSE, booking.status='Booked'
-- where cab.availablity=true and booking.status='Waiting'


-- Query5 / Trayambak
UPDATE CUSTOMER 
SET email = 'prabhnoor01@gmail.com' , phone_number = '9088443276'
WHERE customer_id = 1 ;


-- Query6 / Trayambak
--- SKIP ; OUR DATABASE IS DESIGNED SUCH THAT CAB DRIVERS ARE BY DEFAULT ASSOCIATED WITH CABS


--Query7 / Trayambak
DELETE BOOKING
WHERE booking_id = 02 ;


--Query8 / Trayambak 
UPDATE BOOKING
inner join CAR_TYPE on booking.car_type_id = CAR_TYPE.car_type_id
SET feedback = 'Extremely Good' , rating = 7, bill = hour_count * CAR_TYPE.hourly_rate 
WHERE booking_id = 01 ;


-- UPDATE driver 
-- set money_earned = money_earned + (select bill from BOOKING where BOOKING.driver_id =  driver.driver_id);

-- UPDATE BOOKING
-- SET bill = hour_count * hourly_rate 
-- WHERE booking_id = 02 ;

-- Query9 / Trayambak
-- in this query USE TRIGGER OTHER METHODS ARE NOT PERMISSIBLE
-- drop trigger apply_surge_charge;
drop trigger apply_surge_charge;
DELIMITER %%
CREATE TRIGGER apply_surge_charge
before insert ON booking
FOR EACH ROW
BEGIN
    set new.bill = new.bill + 50 ;
END %%
DELIMITER;

INSERT INTO BOOKING (customer_id , pickup_location , dropoff_location, start_time , car_type_id)
VALUES (1 ,'delhi' , 'patna','2023-04-09 18:00:00' , 1) ;
select * from booking;




-- SELECT count(booking_id) as total_bookings from BOOKING_WAIT 
-- UPDATE BOOKING
-- SET bill = total_bookings*10 + bill
-- WHERE booking_id = 02 ;


--procedures for admin to check available cars, databases, money earned by driver/cab_type

-- Q10/NEK
DELIMITER &&
drop procedure cars_available;
CREATE PROCEDURE cars_available()
BEGIN
    select * from CAR_TYPE
    inner join CAB
    ON CAR_TYPE.car_type_id = CAB.car_type_id
    WHERE CAR_TYPE.car_type_id = 1 AND (SELECT availablity FROM DRIVER WHERE DRIVER.driver_id = CAB.driver_id)=true;
END &&
DELIMITER ;


-- q11/nek
DELIMITER &&
CREATE PROCEDURE money_earned_by_driver(id INT)
BEGIN
    SELECT SUM(BILL) AS money_earned FROM BOOKING 
    join CAB ON BOOKING.car_id = CAB.car_id
    WHERE BOOKING.driver_id=id;
END &&
DELIMITER ;

--q12/nek
DELIMITER &&
CREATE PROCEDURE money_earned_by_car_type(id INT)
BEGIN
    SELECT SUM(BILL) AS money_earned FROM BOOKING 
    WHERE BOOKING.car_type_id = id;
END &&
DELIMITER ;

--q13/nek
DELIMITER &&
CREATE PROCEDURE view_customer_database()
BEGIN
    select * from CUSTOMER;
END &&
DELIMITER ;

--q14
DELIMITER &&
CREATE PROCEDURE view_driver_and_cabs_database()
BEGIN  
    select * from DRIVER
    join CAB on DRIVER.driver_id = CAB.driver_id;
END &&
DELIMITER ;

CALL cars_available();
CALL money_earned_by_driver;
CALL money_earned_by_car_type;
CALL view_customer_database;
CALL view_driver_and_cabs_database;


-- -- cab allotment
-- update booking
-- join CAB on booking.car_type_id=CAB.car_type_id 
-- SET BOOKING.car_id = CAB.car_id, cab.availablity = false where cab.availablity=true;



-- Trayambak attempt

-- SELECT * FROM booking WHERE status = 'Waiting' AS WAITLIST
-- SELECT * FROM cab WHERE availablity = 1 AS AVAILABLECABS



-- update booking
-- left join WITHOUT DUPLICATE booking on booking.car_type_id=CAB.car_type_id 
-- SET BOOKING.car_id = CAB.car_id, cab.availablity = false where cab.availablity=true;



-- UPDATE BOOKING
I

-- final attempt

-- SELECT * AS AV_CAB FROM CAB WHERE car_id = 2  LIMIT 1 ;

-- SELECT * FROM BOOKING WHERE car_type_id = (AV_CAB.car_type_id) AND status = 'Waiting' AS WAIT_BOOK ;


update booking join
(SELECT * FROM CAB WHERE car_id = 7)sub1
INNER JOIN (SELECT * FROM BOOKING WHERE booking.car_type_id = (SELECT cab.car_type_id FROM CAB WHERE car_id = 7) and BOOKING.status = "Waiting" LIMIT 1 )sub2
ON sub1.car_type_id = sub2.car_type_id
set booking.status="Ongoing", booking.car_id=7
where booking.car_type_id = (SELECT cab.car_type_id FROM CAB WHERE car_id = 7) limit 1;