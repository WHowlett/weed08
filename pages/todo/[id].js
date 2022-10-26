import React from "react";
import { Box, Heading, others, SimpleGrid, Text } from "@chakra-ui/react";
import useAuth from "../../hooks/useAuth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

const TodoItem = ({ itemData }) => {
    const {user} = useAuth() || {};
    if (!user) {
        return;
    }

    return (
        <Box mt={5} padding="20px">
                <Heading as="h3">
                    {itemData.title}
                </Heading>
                <Text>
                    {itemData.description}
                </Text>
                <Text>
                    {itemData.status}
                </Text>
                <Text>
                    {itemData.born}
                </Text>
                <Text>
                    {itemData.location}
                </Text>
        </Box>
    )
};

export async function getServerSideProps(context) {
    let itemData = null;
    const docRef = doc(db, 'family', context.params.id);
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
        itemData = docSnap.data();
    }

    return {
        props: {
            itemData
        }
    }
}
export default TodoItem;