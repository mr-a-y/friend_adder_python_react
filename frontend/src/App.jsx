import { Button, Container, Stack, Text } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Usergrid from "./components/UserGrid";
import { useState } from "react";

// Set the backend URL to the deployed instance
export const BASE_URL = "https://friend-adder-python-react.onrender.com/api";

function App() {
  const [users, setUsers] = useState([]);

  return (
    <Stack minH={"100vh"}>
      <Navbar setUsers={setUsers} />

      <Container maxW={"1200px"} my={4}>
        <Text
          fontSize={{ base: "3xl", md: "50" }}
          fontWeight={"bold"}
          letterSpacing={"2px"}
          textTransform={"uppercase"}
          textAlign={"center"}
          mb={8}
        >
          <Text as={"span"}> Demo For React + Python </Text> 🚀
        </Text>
        <Usergrid users={users} setUsers={setUsers} />
      </Container>
    </Stack>
  );
}

export default App;
