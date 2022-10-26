import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "../api/todo";
const AddTodo = () => {
    const [title, setTitle] = React.useState("");
    const [born, setBorn] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleTodoCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to Add family Members",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const todo = {
            title,
            born,
            description,
            location,
            status,
            userId: user.uid,
        };
        await addTodo(todo);
        setIsLoading(false);
        setTitle("");
        setBorn("");
        setDescription("");
        setLocation("");
        setStatus("Wayne Side");
        toast({ title: "Family member created successfully", status: "success" });
    };
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Date of Birth"
                    value={born}
                    onChange={(e) => setBorn(e.target.value)}
                />
                <Textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Textarea 
                    placeholder="Place of birth"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option
                        value={"Wayne Side"}
                        style={{ color: "yellow", fontWeight: "bold" }}
                    >
                        Wayne Family Side
                    </option>
                    <option
                        value={"Lara Side"}
                        style={{ color: "green", fontWeight: "bold" }}
                    >
                        Lara Family Side
                    </option>
                </Select>
                <Button
                    onClick={() => handleTodoCreate()}
                    disabled={title.length < 1 || description.length < 1 || isLoading}
                    variantColor="teal"
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};
export default AddTodo;