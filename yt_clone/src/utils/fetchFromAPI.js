import axios  from 'axios';
const BASE_URL='https://youtube-v31.p.rapidapi.com';
const options = {
    //url: BASE_URL,
    params: { maxResults:'50'},
    headers: {
      'X-RapidAPI-Key': '240cddbeacmsh884f064cdab5cb4p17260ajsn478c2f9553ba',
      'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
  };
  
export const fetchFromAPI=async(url)=>{
    const {data} = await axios.get(`${BASE_URL}/${url}`,options);
    return data;
}