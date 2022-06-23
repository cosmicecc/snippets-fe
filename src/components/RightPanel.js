import {useState, useEffect} from 'react';
import { Box, Heading, Link, List, ListItem, Button, Stack } from "@chakra-ui/react";

export default function RightPanel(props) {
    // Set up initial values and state.
    const [categories, setCategories] = useState([]);
    const [isActive, setActive] = useState();

    const toggleClass = (index) => {
        // Toggle active/inactive using the 
        // index passed from the clicked on category link.
        if (index) {
            props.handleCategoryClick(index)
            setActive((isActive) => (isActive === index ? null : index));
        } else {
            props.handleCategoryClick(null)
            setActive();
        }
    };

    useEffect(() => {
        setCategories(props.categories)
    }, [])

    // Build the list of categories by mapping over the data from the fetch request.
    const categoriesList = categories.map(category => 
        <ListItem key={category.id}>
            <Link 
                onClick={() => {
                    toggleClass(category.id)
                }} 
                // Highlight the clicked on/selected category.
                sx={isActive === category.id ? { textDecoration: 'underline' } : null}
            >
                {category.attributes.Name}
            </Link>
        </ListItem>
    )

    return (
        <Box textAlign='left' m='5'>
            <Stack spacing={2}>
            <Heading as='h3' size='md'>Categories</Heading>
            <List mt='5' fontSize="md">
                {categoriesList}
            </List>
            <Button 
                mt='5' 
                variant="solid" 
                size="sm" 
                colorScheme="gray" 
                borderRadius={25} 
                onClick={() => {
                    toggleClass(null)
                }}
            >
                Show All
            </Button>
            </Stack>
        </Box>
    )
}