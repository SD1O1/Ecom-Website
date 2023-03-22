import React from 'react'
import { useState, useEffect } from 'react'
import { Box, Typography}from '@mui/material'
import { useParams } from 'react-router-dom'
import {Videos} from './'
import { fetchFromAPI } from '../utils/fetchFromAPI'


const SearchFeed = () => {

  const [videos, setVideos] = useState([]);
  const{searchTerm}=useParams();

  useEffect(()=>{
    fetchFromAPI(`search?part=snippet&q=${searchTerm}`)
    .then((data)=> setVideos(data.items))
  },[searchTerm]);

  return (
    <Box p={2} sx={{overflowY:'scroll' , height:'90vh' , flex:2}}>
      <Typography variant="h4" frontWeight='bold' mb={2} sx={{ color : 'white'}}>
        Search result for : <span style={{color:'red'}}>
         {searchTerm}</span> videos
      </Typography> 

      <Videos videos={videos}/>

     </Box>
  )
}

export default SearchFeed
