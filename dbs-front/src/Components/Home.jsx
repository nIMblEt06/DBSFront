import React, { useState } from 'react'
import { Box, Flex, FormControl, GridItem, SimpleGrid, FormLabel, FormHelperText, Input, Heading, Link, Textarea, Text, VStack, Button } from '@chakra-ui/react'
import "../App.css"
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

    async function submitForm() {
        const response = await fetch("http://127.0.0.1:9000/sendDetails", {
            method: "POST",
            body: JSON.stringify({formInfo, customerFormType}),
            contentType: 'application/json'
        })
        // const response = await fetch("http://127.0.0.1:9000/helpMe", {
        //     method: "GET",
        // })
        console.log(response);
        const result = await response.json()
        console.log(result);
    }

    function openCustomerMenu() {
        setShowCustomer(prevCustomer => !prevCustomer)
    }
    function openDriverMenu() {
        setShowDriver(prevDriver => !prevDriver)
    }
    function showInitMenu(e) {
        setCustomerFormType(e.target.id)
        if (e.target.id == "none") {
            setCustomerFormType(null)
        }
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
                    <Button id="three" onClick={showInitMenu}>New Booking</Button>
                    <Button id="four" onClick={showInitMenu}>Status of Booking</Button>
                    <Button id="five" onClick={showInitMenu}>Bill Payment</Button>
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
                </VStack>}
                {/* {customerFormType == "three" && <VStack display={initMenu ? "none" : "flex"} className='customerOptionsCont'>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="id" fontSize="20px" fontWeight="600">customer id</FormLabel>
                        <Input id="id" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your customer id" name="id" type="text" value={formInfo.id} />
                    </Box>
                </VStack>} */}
                {customerFormType == "four" && <VStack display={initMenu ? "none" : "flex"} className='customerOptionsCont'>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="id" fontSize="20px" fontWeight="600">customer id</FormLabel>
                        <Input id="id" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your customer id" name="id" type="text" value={formInfo.id} />
                    </Box>
                    <Box w="100%">
                        <FormLabel cursor="pointer" htmlFor="bookId" fontSize="20px" fontWeight="600">booking id</FormLabel>
                        <Input id="bookId" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your booking id" name="bookId" type="text" value={formInfo.bookId} />
                    </Box>
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
                {customerFormType !== null && <Button className="submitButton" onClick={submitForm}>Submit</Button>}
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

/* <FormControl mt="2rem">
                                <SimpleGrid columns={2} columnGap={2} rowGap={4} w="full" >
                                    <GridItem colSpan={1}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="name"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >first name</FormLabel>
                                        <Input disabled={true} opacity="1 !important" id="name" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your first name here" name="name" type="text" value={formInfo.name} />
                                    </GridItem>
                                    <GridItem colSpan={1}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="lastName"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >last name</FormLabel>
                                        <Input disabled={true} opacity="1 !important" id="lastName" onChange={handleChange} p="1.2rem 0.8rem" w="80%" placeholder="enter your last name here" name="lastName" type="text" value={formInfo.lastName} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="email"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >personal email</FormLabel>
                                        <Input pattern="f20[1-2]\d\d\d\d\d@pilani\.bits-pilani\.ac\.in" opacity="1 !important" w="90%" id="email" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your personal mail here" name="pEmail" type="text" value={formInfo.pEmail} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="id"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >bits id</FormLabel>
                                        <Input w="90%" id="id" pattern="20[1-2]\d[A-B][1-8]([A-B][1-5])?PS\d\d\d\dP" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your id number here" name="id" type="text" value={formInfo.id} />
                                    </GridItem>
                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="phone"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >phone</FormLabel>
                                        <Input w="90%" id="phone" pattern="20[1-2]\d[A-B][1-8]([A-B][1-5])?PS\d\d\d\dP" onChange={handleChange} p="1.2rem 0.8rem" placeholder="enter your 10 digit phone number here" name="phone" type="number" value={formInfo.phone} />
                                    </GridItem>

                                    <GridItem colSpan={2}>
                                        <FormLabel
                                            cursor="pointer"
                                            htmlFor="quote"
                                            fontSize="20px"
                                            fontWeight="600"
                                        >yearbook quote</FormLabel>
                                        <Textarea w="90%" maxLength="140" borderColor="#444" size="sm" resize="none" id="quote" onChange={handleChange} p="0.8rem" placeholder="enter your yearbook quote here" name="quote" value={formInfo.quote} />
                                        <FormHelperText mt="0.4rem" mb="6rem">{formInfo.quote.length}/140 characters used</FormHelperText>
                                    </GridItem>
                                </SimpleGrid>
                            </FormControl> */