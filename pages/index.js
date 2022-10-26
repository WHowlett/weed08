import { Container, Box } from "@chakra-ui/react";
import TodoList from "../components/TodoList";
export default function Home() {
return (
<Container maxW="7xl">
  <Box>
    <h1>
      Sign in to add family Members
    </h1>  </Box>
<TodoList />
</Container>
);
}