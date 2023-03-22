import React from 'react'
import { height, Stack } from '@mui/system'
import { categories } from '../utils/constant'


const SideBar = ({selectedCategory,setSelectedCategory}) => 
   (
    <Stack direction='row'  
        sx={{
            overflowY:"scroll",
            height: {sx:'auto', md:'95%'},
            flexDirection: {md: 'column'},
        }}>
        {categories.map((category)=>(
            <button className='category-btn' 
                onClick={()=> setSelectedCategory
                    (category.name)}
                style={{background : category.name===selectedCategory && 'red', color:'white'}} key={category.name}>
                <span 
                 style={{color: category.name===selectedCategory ? 'white':'red', marginRight:'15px'}}>
                 {category.icon}
                </span>
                <span
                 style={{opacity:category.name===selectedCategory ?'1':'0.7'}}>
                 {category.name}
                </span>
            </button>
        ))}
    </Stack>
   )


export default SideBar