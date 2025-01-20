import { Avatar, Box, Card, CardBody, CardHeader, Flex, Heading, IconButton, Text,useToast } from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi";
import EditModal from "./EditModal";
import { BASE_URL } from "../App";

const UserCard = ({ user, setUsers }) =>{
  const toast = useToast();
  const handleDeleteUser = async () => {
    
    try {
      const res = await fetch(BASE_URL+"/friends/"+ user.id, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error(data.error);
      }
      setUsers((users) => users.filter((u) => u.id !== user.id));

      toast({ 
        title: "User Deleted",
        description: "User has been deleted successfully",
        duration: 2000,
        status: "success",
        position: 'top-right',
        isClosable: true,
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
  }
  return (
    <Card>
      <CardHeader>
        <Flex gap={4}>
          {/*Left Flex has avatar with username and role*/}
          <Flex flex={'1'} gap={"4"} alignItems={"center"}>
            <Avatar src= {user.imgUrl} />

            <Box>
              <Heading size='sm'>{user.name}</Heading>
              <Text>{user.role}</Text>
            </Box>

          </Flex>
          {/*right Flex the edit and delete button*/}
          <Flex>
            <EditModal setUsers={setUsers} user={user}/>
            <IconButton
              variant='ghost'
              colorScheme='red'
              size={"sm"}
              aria-label='See menu'
              icon={<BiTrash size={20} />}
              onClick={handleDeleteUser} 
            />

          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text>{user.description}</Text>
      </CardBody>
    </Card>
  );
};

export default UserCard;
