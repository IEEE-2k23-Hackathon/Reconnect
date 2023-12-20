import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Center,
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from "../../../context/ChatProvider";
import { getAssitNumber } from "../../../config/ChatLogic";

const AssistCall = ({ children }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedAssit, setselectedAssit] = useState('Select Type of Assist');
    const [Msg, setMsg] = useState("");
    const [Latitude, setLatituse] = useState();
    const [Longitude, setLongitude] = useState();

    const {selectedChat,CurrentUser} = ChatState();

    //console.log(selectedChat.users[0].AgencyName);

    const toast = useToast();

    const handleSubmit = async () => {

        if (!selectedAssit || !Latitude) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        console.log();

        try {

            const { data } = await axios.post('/api/assistNeeded', {
                UserLongitude:Longitude,
                UserLatitude:Latitude,
                AssitType:selectedAssit,
                Message:Msg,
                AgencyNumberToCall:getAssitNumber(CurrentUser,selectedChat.users),
                AgencyNumberNeedAssit:CurrentUser.AgencyName
            })

            console.log(data);

            onClose();

            return toast({
                title: "Assist Sucessfully Called",
                status: "success",
                duration: 6000,
                isClosable: true,
                position: "top",
            });
    
            
            
        } catch (error) {
            toast({
                title: "Failed to Create Assist , Try Agian....!",
                description: error.response.data,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }



    const handleGetLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Get latitude and longitude from the position object
                    setLatituse(position.coords.latitude)
                    setLongitude(position.coords.longitude)
                },
                (error) => {
                    // Handle error when geolocation fails
                    console.error("Error getting location:", error);
                }
            );
            toast({
                title: "This is Your Current Location Coordinates.If you are not in Spot give the Coordinates Manually",
                status: "warning",
                duration: 8000,
                isClosable: true,
                position: "top",
            });

        } else {
            // Geolocation is not supported by the browser
            console.error("Geolocation is not supported by your browser.");
        }
    };


    return (
        <>
            <span onClick={onOpen}>{children}</span>

            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="25px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Ask Assistance
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDir="column" alignItems="center" >
                        <FormControl pb={5} display={"flex"} alignItems={"center"}>
                            <Text fontWeight={"bold"} pr={5}>
                                Assist Type :
                            </Text>
                            <Menu>
                                <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                    {selectedAssit}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem value='Man Power Assist' onClick={(e) => { setselectedAssit(e.target.value) }} > Man Power Assist </MenuItem>
                                    <MenuItem value='Vehicles Assist' onClick={(e) => { setselectedAssit(e.target.value) }}> Vehicles Assist </MenuItem>
                                    <MenuItem value='Equipment Assist' onClick={(e) => { setselectedAssit(e.target.value) }}> Equipment Assist </MenuItem>
                                    <MenuItem value='Just Enquiry Assist' onClick={(e) => { setselectedAssit(e.target.value) }}> Just Enquiry Assist </MenuItem>
                                </MenuList>
                            </Menu>
                        </FormControl>
                        <FormControl display={"flex"} flexDir={"column"}>
                            <Button
                                colorScheme="teal"
                                onClick={handleGetLocation}
                                mb={2}
                                size="sm"
                                width={40}
                            >
                                Get Location
                            </Button>
                            <Input
                                placeholder="Latitude"
                                mb={1}
                                value={Latitude}
                                onChange={(e) => setLatituse(e.target.value)}
                                width={200}
                            />
                            <Input
                                placeholder="Longitude"
                                mb={1}
                                value={Longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                                width={200}
                            />
                        </FormControl>

                        <FormControl mt={5}>
                            <Input
                                    placeholder="Send Emergency Notification message"
                                    mb={1}
                                    value={Msg}
                                    onChange={(e) => setMsg(e.target.value)}
                            />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="red">
                            Call Assist
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default AssistCall;
