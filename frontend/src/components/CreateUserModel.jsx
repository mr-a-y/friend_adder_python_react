import { 	Button,
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
	ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { BiAddToQueue } from "react-icons/bi"
 

const CreateUserModel = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
  return (<>
  
   <Button onClick={onOpen}>
    <BiAddToQueue size={20}/>
   </Button>

    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader> New User</ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
                <Flex alignItems={"center"} gap={4}>
                   <FormControl>
                    <FormLabel>Full Name</FormLabel>
                    <Input placeholder="Jhon Doe"></Input>
                   </FormControl>

                   <FormControl>
                    <FormLabel>Role</FormLabel>
                    <Input placeholder="Developer"></Input>
                   </FormControl>




                </Flex>       
                <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input placeholder="Learning to code"></Input>
                </FormControl>

                <RadioGroup mt={4}>
                    <Flex gap={5}>
                        <Radio value='male'>Male</Radio>
                        <Radio value='female'>Female</Radio>
                    </Flex>
                   </RadioGroup>
            </ModalBody>
            <ModalFooter>
                <Button colorScheme="blue" mr={3}>
                    Add
                </Button>
                <Button onClick={onclose}>Cancel</Button>
                
            </ModalFooter>
        </ModalContent>


    </Modal>

  </>
  
  )
}

export default CreateUserModel
