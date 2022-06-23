import {useState, useEffect} from 'react';
import {
  Box,
  VStack,
  Code,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Heading,
  useClipboard,
  Button,
  Flex, 
  Spacer,
} from '@chakra-ui/react';

export default function Snippets(props) {
  // Set up initial values and state.
  const [snippets, setSnippets] = useState([]);
  const [copyValue, setCopyValue] = useState('')
  // Part of Chakra UI - use for copying stuff to clipboard.
  const { hasCopied, onCopy } = useClipboard(copyValue)
  useEffect(() => {
    setSnippets(props.snippets)
  }, [props.snippets])

  // When an accordion is opened (clicked on), add that 
  // snippet value to the copy value to allow it to be copied.
  function doSetCopyValue(value) {
    setCopyValue(value);
  }

  // Build the list of snippets by mapping over the data from the fetch request.
  const snippetsList = snippets.length > 0 ? snippets.map(snippet => 
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
          <Code borderRadius="15px" padding="8px">
            {snippet.attributes.Snippet}
          </Code>
          <Spacer/>
          <Button onClick={onCopy} ml={2} borderRadius="15px" padding="8px">
            {hasCopied ? 'Copied' : 'Copy'}
          </Button>
        </Flex>
      </AccordionPanel>
    </AccordionItem>
  ) : 'There are no results for that selection.'

  return (
    <VStack spacing={8}>
      <Heading>Snippets</Heading>
      <Accordion allowToggle minW="600px">
        {snippetsList}
      </Accordion>
    </VStack>
  )
}