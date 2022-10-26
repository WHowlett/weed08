import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import Link from "next/link"
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../api/todo";
const TodoList = () => {
    const [todos, setTodos] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setTodos([]);
            return;
        }
        const q = query(collection(db, "family"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setTodos(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const handleTodoDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this Family memeber?")) {
            deleteTodo(id);
            toast({ title: "Family deleted successfully", status: "success" });
        }
    };
    const handleToggle = async (id, status) => {
        const newStatus = status == "Wayne Side" ? "Lara Side" : "Lara Side";
        await toggleTodoStatus({ docId: id, status: newStatus });
        toast({
            title: `Family marked ${newStatus}`,
            status: newStatus == "Lara Team" ? "Lara Side" : "Wayne Side",
        });
    };
    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {todos &&
                    todos.map((todo) => (
                        <Box
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                        >
                            <Heading as="h3" fontSize={"xl"}>
                                {todo.title}{" "}
                                <Badge
                                    color="red.500"
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleTodoDelete(todo.id)}
                                >
                                    <FaTrash />
                                </Badge>
                                <Badge
                                    color={todo.status == "pending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(todo.id, todo.status)}
                                >
                                    {todo.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                                </Badge>
                                <Badge
                                    float="right"
                                    opacity="0.8"
                                    bg={todo.status == "pending" ? "yellow.500" : "green.500"}
                                >
                                    {todo.status}
                                </Badge>
                            </Heading>
                            <Text>{todo.born}{""}</Text>
                            <Link href={`/todo/${todo.id}`}>Click here for more information</Link>
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};
export default TodoList;