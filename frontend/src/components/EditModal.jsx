import {
Button,
Flex,
FormControl,
FormLabel,
IconButton,
Input,
Modal,
ModalBody,
ModalCloseButton,
ModalContent,
ModalFooter,
ModalHeader,
ModalOverlay,
Textarea,
useDisclosure,
useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { BASE_URL } from "../App";

function EditModal({setUsers, user }) {
const { isOpen, onOpen, onClose } = useDisclosure();
const [isLoading, setIsLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: user.name,
        role: user.role,
        description: user.description,    
        gender: user.gender,
    });

const toast = useToast();

const handleEditUser = async (e) => { 
    e.preventDefault();
    if (!inputs.name || !inputs.role || !inputs.description || !inputs.gender) {
        toast({
            title: "Error",
            description: "Please fill all fields before submitting",
            status: "error",
            duration: 2000,
            isClosable: true,
            position:'top-right',
        });
        return;  // Stop further execution if validation fails
    }
    setIsLoading(true);
    console.log("Submitting data:", inputs);
    try {
        const res = await fetch(BASE_URL+"/friends/"+ user.id, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputs),
        });
        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error);
        }
        setUsers((users) => users.map((u) => u.id === user.id ? data : u));
        toast({
            title: "User Updated Successfully",
            description: "User has been updated successfully",
            duration: 2000,
            status: "success",
            position: 'top-right',
            isClosable: true,
        });
        onClose();
    } catch (error) {
        toast({
            title: "An error occurred",
            description: error.message,
            status: "error",
            duration: 2000,
            position: 'top-right',
            isClosable: true,
        });
    } finally {
        setIsLoading(false);
    }   
  }

return (
    <>
        <IconButton
            onClick={onOpen}
            variant='ghost'
            colorScheme='blue'
            aria-label='See menu'
            size={"sm"}
            icon={<BiEditAlt size={20} />}
        />

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <form onSubmit={handleEditUser}>
                <ModalContent>
                    <ModalHeader>Edit User</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Flex alignItems={"center"} gap={4}>
                            <FormControl>
                                <FormLabel>Full Name</FormLabel>
                                <Input placeholder='John Doe' value={inputs.name} onChange={(e) => setInputs({...inputs, name: e.target.value})} maxlength="20"/>
                            </FormControl>

                            <FormControl>
                                <FormLabel>Role</FormLabel>
                                <Input placeholder="Developer"
                                        value={inputs.role}
                                        maxlength="20"
                                        onChange={(e) => setInputs({...inputs, role: e.target.value})} />
                            </FormControl>
                        </Flex>
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea
                                resize={"none"}
                                overflowY={"hidden"}
                                value={inputs.description}
                                maxlength="450"
                                    onChange={(e) => setInputs({...inputs, description: e.target.value})}
                                placeholder="He's a software engineer who loves to code and build things."
                            />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} type="submit" isLoading={isLoading}>
                            Update
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </form>    
        </Modal>
    </>
);
}

export default EditModal;