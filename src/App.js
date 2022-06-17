import React from 'react';
import {useState, useEffect} from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Code,
  theme,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  useClipboard,
  Button,
  Flex, 
  Spacer ,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  // Set up initial values and state.
  const snippetsPath = 'http://localhost:1337/api/snippets?populate=*'
  const [snippets, setSnippets] = useState([]);
  const [copValue, setCopyValue] = useState('')
  // Part of Chakra UI - use for copying stuff to clipboard.
  const { hasCopied, onCopy } = useClipboard(copValue)

  // When an accordion is opened (clicked on), add that 
  // snippet value to the copy value to allow it to be copied.
  function doSetCopyValue(value) {
    setCopyValue(value);
  }

  // Build the list of snippets by mapping over the data from the fetch request.
  const snippetsList = snippets.map(snippet => 
    <AccordionItem key={snippet.id}>
      <h2>
        {/* Set the copy value to the value of this snippet. */}
        <AccordionButton onClick={() => doSetCopyValue(snippet.attributes.Snippet)}>
          <Box flex='1' textAlign='left'>
            {snippet.attributes.Name}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <Flex>
          <Code>
            {snippet.attributes.Snippet}
          </Code>
          <Spacer/>
          <Button onClick={onCopy} ml={2}>
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  )

  // Fetch data from the Strapi api.
  useEffect(() => {
    fetch(snippetsPath, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      setSnippets(data.data)
    })
  },[])

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Flex minH="100vh" p={3} border="2px">
        <Spacer/>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Heading>Snippets</Heading>
            <Accordion allowToggle minW="600px">
              {snippetsList}
            </Accordion>
          </VStack>
          <Spacer/>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}

export default App;
