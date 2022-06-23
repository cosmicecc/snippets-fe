import {React, useState, useEffect} from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  theme,
  Flex, 
  Spacer,
  Spinner,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import Snippets from './components/Snippets';
import RightPanel from './components/RightPanel';

export default function App() {
  // Set up initial values and state.
  const apiPath = 'http://localhost:1337/api/'
  const snippetsPath = 'snippets?populate=categories'
  const categoriesPath = 'categories'
  const [isLoading, setIsLoading] = useState(true);
  const [snippets, setSnippets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    // If there is a filter (someone has clicked on a category link)
    // add the filter path to the snippets path.
    const dataPath = filter ? snippetsPath+filter : snippetsPath
    const getData = async () => {
      const resSnippets = await axios(apiPath+dataPath);
      const resCategories = await axios(apiPath+categoriesPath);
      return ([
        await resSnippets.data.data,
        await resCategories.data.data
      ]);
    }
    getData().then(data => {
      setSnippets(data[0])
      setCategories(data[1])
      setIsLoading(false)
    })
    .catch(err => { 
      console.log(err)
    });

  }, [filter])
 
  // Set the filter value when a category is clicked on.
  function handleCategoryClick(cat) {
    if (cat) {
      setFilter('&filters[categories][id][$eq]='+cat);
    } else {
      setFilter('');
    }
  }

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl"> 
        <Flex minH="100vh" p={3}>
          <Spacer/>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Box border='3px solid grey'>
            {isLoading ? <Spinner /> : <Snippets snippets={snippets}/>}            
          </Box>
          <Box border='3px solid grey' minW='200px'>
            {isLoading ? null : <RightPanel categories={categories} handleCategoryClick={handleCategoryClick}/>} 
          </Box>
          <Spacer/>
        </Flex>
      </Box>
    </ChakraProvider>
  );
}