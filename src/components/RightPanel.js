import {useState, useEffect} from 'react';
import { Box, Heading, Link, List, ListItem, Button, Stack, textDecoration } from "@chakra-ui/react";

export default function RightPanel(props) {
    // Set up initial values and state.
    const [categories, setCategories] = useState([]);
    const [isActive, setActive] = useState();

    const toggleClass = (index) => {
        // Toggle active/inactive using the 
        // index passed from the clicked on button.
        if (index) {
            setActive((isActive) => (isActive === index ? null : index));
        } else {
            setActive();
        }
    };

    useEffect(() => {
        setCategories(props.categories)
      }, [])
    // Build the list of categories by mapping over the data from the fetch request.
    const categoriesList = categories.map((category, index) => 
        <ListItem key={category.id}>
            <Link 
                onClick={() => {
                    props.handleCategoryClick(category.id)
                    toggleClass(index)
                }} 
                sx={isActive === index ? { textDecoration: 'underline' } : null}
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
                    props.handleCategoryClick(null)
                    toggleClass(null)
                }}
            >
                Show All
            </Button>
            </Stack>
        </Box>
    )
}