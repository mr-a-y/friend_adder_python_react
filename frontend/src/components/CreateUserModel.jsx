import { useState } from "react";
import {  
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    Radio,
    RadioGroup,
    ModalHeader,
    ModalOverlay, 
    useDisclosure, 
    useToast
} from "@chakra-ui/react";
import { BiAddToQueue } from "react-icons/bi";
import { BASE_URL } from "../App";

const CreateUserModel = ({setUsers}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isloading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        role: "",
        description: "",    
        gender: "",
    });

    const toast = useToast();

    const handleCreateUser = async (e) => {
        e.preventDefault();
        console.log("Submitting data:", inputs);

    
        setIsLoading(true);
		try {
			const res = await fetch(BASE_URL + "/friends", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(inputs),
			});

			const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error);
            }

            toast({
                title: "User Created Successfully",
                description: "User has been created successfully",
                status: "success",
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            });
            onClose();

            setUsers((prevUsers) => [...prevUsers, data]);
            setInputs({
                name: "",
                role: "",
                description: "",    
                gender: "",
             }); 
        } catch (error) {
            toast({
                title: "An error occurred",
                description: error.message,
                status: "error",
                duration: 2000,
                position: 'top-right',
                isClosable: true,
            });
            
        }
        finally {
            setIsLoading(false);  
            

        }
    }

    return (
        <>
            <Button onClick={onOpen}>
                <BiAddToQueue size={20}/>
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay /> 
                <form onSubmit={handleCreateUser}>
                    <ModalContent>
                        <ModalHeader> New User</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <Flex alignItems={"center"} gap={4}>
                                <FormControl>
                                    <FormLabel>Full Name</FormLabel>
                                    <Input 
                                        placeholder="John Doe"
                                        value={inputs.name}
                                        onChange={(e) => setInputs({...inputs, name: e.target.value})}
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel>Role</FormLabel>
                                    <Input 
                                        placeholder="Developer"
                                        value={inputs.role}
                                        onChange={(e) => setInputs({...inputs, role: e.target.value})}
                                    />
                                </FormControl>
                            </Flex>       

                            <FormControl mt={4}>
                                <FormLabel>Description</FormLabel>
                                <Input 
                                    placeholder="Learning to code"
                                    value={inputs.description}
                                    onChange={(e) => setInputs({...inputs, description: e.target.value})}
                                />
                            </FormControl>

							<RadioGroup mt={4}>
								<Flex gap={5}>
									<Radio
										value='male'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Male
									</Radio>
									<Radio
										value='female'
										onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
									>
										Female
									</Radio>
								</Flex>
							</RadioGroup>

                        </ModalBody>

                        <ModalFooter>
                            <Button 
                                colorScheme="blue" 
                                mr={3} 
                                type="submit" 
                                isLoading={isloading}>
                                Add
                            </Button>
                            <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </form>
            </Modal>
        </>
    );
};

export default CreateUserModel;
 