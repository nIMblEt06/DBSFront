import React, { useState } from 'react'
import { Box, Flex, FormControl, GridItem, SimpleGrid, FormLabel, FormHelperText, Input, Heading, Link, Textarea, Text, VStack, Button, } from '@chakra-ui/react'
import "../App.css"
import Table from './Table'
// import axios from "axios"

function Home() {
    const [formInfo, setFormInfo] = useState({
        name: "",
        id: "",
        bookId: "",
        paymentType: "",
        email: "",
        phone: ""
    })
    const [showCustomer, setShowCustomer] = useState(false)
    const [showDriver, setShowDriver] = useState(false)
    const [initMenu, setInitMenu] = useState(true)
    const [customerFormType, setCustomerFormType] = useState(null)
    const [details, setDetails] = useState(null)
    const [canSubmit, setCanSubmit] = useState(false)

    async function submitForm() {
        const response = await fetch("http://127.0.0.1:9000/sendDetails", {
            method: "POST",
            body: JSON.stringify({ formInfo, customerFormType }),
            contentType: 'application/json'
        })
        // const response = await fetch("http://127.0.0.1:9000/helpMe", {
        //     method: "GET",
        // })
        setCanSubmit(false)
        if (customerFormType == 'one') {
            alert('Submitted!')
        }
        const result = await response.json()
        console.log(result);
        if (customerFormType == 'two') {
            setDetails(result)
        }

        if (customerFormType == 'four') {
            setDetails(result[0][0].toLowerCase())
        }
        // if (customerFormType == 'two'){
        //     setDetails()
        // }
    }
    console.log(details);

    function openCustomerMenu() {
        setShowCustomer(prevCustomer => !prevCustomer)
    }
    function openDriverMenu() {
        setShowDriver(prevDriver => !prevDriver)
    }
    function showInitMenu(e) {
        setCustomerFormType(e.target.id)
        setDetails(null)
        if (e.target.id == "none") {
            setCustomerFormType(null)
        }
        setCanSubmit(true)
        setInitMenu(prevInitMenu => !prevInitMenu)
    }

    function handleChange(event) {
        const { name, value } = event.target
        setFormInfo(prevFormInfo => {
            return {
                ...prevFormInfo,
                [name]: value
            }
        })
    }

    return (
        <Flex minHeight="100vh" bg="black" position="relative">
            <Box className="customerMenu" display={showCustomer ? "flex" : "none"}>
                <Box className="removeButton" onClick={openCustomerMenu}>X</Box>
                {customerFormType == null && <Box fontSize="2.4rem" marginBottom="2rem">what would you like to do today?</Box>}
                <VStack display={initMenu ? "flex" : "none"} className='customerOptions'>
                    <Button id="one" onClick={showInitMenu}>New Customer Registration</Button>
                    <Button id="two" onClick={showInitMenu}>Previous Bookings</Button>
                    <Button id="four" onClick={showInitMenu}>Status of Booking</Button>
                    {/* <Button id="five" onClick={showInitMenu}>Bill Payment</Button> */}
                </VStack>
                {customerFormType !== null && <Box id="none" className="backButton" onClick={showInitMenu}>&lt;--</Box>}
                {customerFormType == "one" && <VStack display={initMenu ? "none" : "flex"} className='customerOptionsCont'>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="name" fontSize="20px" fontWeight="600">name</FormLabel>
                        <Input id="name" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your name" name="name" type="text" value={formInfo.name} />
                    </Box>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="email" fontSize="20px" fontWeight="600">email</FormLabel>
                        <Input id="email" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your email" name="email" type="text" value={formInfo.email} />
                    </Box>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="phone" fontSize="20px" fontWeight="600">phone</FormLabel>
                        <Input id="phone" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your phone number" name="phone" type="text" value={formInfo.phone} />
                    </Box>
                </VStack>}
                {customerFormType == "two" && <VStack display={initMenu ? "none" : "flex"} className='customerOptionsCont'>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="id" fontSize="20px" fontWeight="600">customer id</FormLabel>
                        <Input id="id" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your customer id" name="id" type="text" value={formInfo.id} />
                    </Box>
                    {details != null && <Table details={details} />}
                </VStack>}
                {/* {customerFormType == "three" && <VStack display={initMenu ? "none" : "flex"} className='customerOptionsCont'>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="id" fontSize="20px" fontWeight="600">customer id</FormLabel>
                        <Input id="id" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your customer id" name="id" type="text" value={formInfo.id} />
                    </Box>
                </VStack>} */}
                {customerFormType == "four" && <VStack display={initMenu ? "none" : "flex"} className='customerOptionsCont'>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="bookId" fontSize="20px" fontWeight="600">booking id</FormLabel>
                        <Input id="bookId" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your booking id" name="bookId" type="text" value={formInfo.bookId} />
                    </Box>
                    {details != null && <div className='info'>status of your booking is: {details}</div>}
                </VStack>}
                {customerFormType == "five" && <VStack display={initMenu ? "none" : "flex"} className='customerOptionsCont'>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="bookId" fontSize="20px" fontWeight="600">booking id</FormLabel>
                        <Input id="bookId" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your booking id" name="bookId" type="text" value={formInfo.bookId} />
                    </Box>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="paymentType" fontSize="20px" fontWeight="600">your payment method</FormLabel>
                        <Input id="paymentType" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your booking id" name="paymentType" type="text" value={formInfo.paymentType} />
                    </Box>
                </VStack>}
                {customerFormType !== null && canSubmit == true && <Button className="submitButton" onClick={submitForm}>Submit</Button>}
            </Box>
            <Flex bgPosition="center"
                bgRepeat="no-repeat" bgSize="cover" align="center" justify="center" w="100%">
                <Box boxShadow="0px 1px 24px 1px rgba(0, 0, 0, 0.15)" bg="#242323"
                    w="80%" color="white" border="3px" borderStyle="solid"
                    borderColor="white.300" borderRadius="20px" pl="2rem">
                    <Box>
                        <Heading mt="2rem" align="center">Welcome to Cab Booking Services</Heading>
                        <Box marginBlock="2rem">
                            <Flex justifyContent="space-around">
                                <Button onClick={openCustomerMenu} className="initButton" bgColor="black">Customer</Button>
                                <Button onClick={openDriverMenu} className="initButton" bgColor="black">Cab Driver</Button>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            </Flex>
        </Flex>
    )
}

export default Home