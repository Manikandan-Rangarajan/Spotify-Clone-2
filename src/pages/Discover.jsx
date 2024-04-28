import { Error, Loader, SongCard} from '../components';
import { genres } from '../assets/constants';
// import { useGetAlbumDetailsQuery } from '../redux/services/shazamCore'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { data } from 'autoprefixer';

const Discover = () => {

//  const { data, isFetching, error} = useGetAlbumDetailsQuery(); 
 const dispatch = useDispatch();  
 const { activeSong, isPlaying } = useSelector((state) => state.player);
 const genreTitle = 'Pop';   

 const [music, setMusic] = useState([]);

 const getMusic = async() => {
    const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=30&numberOfTopResults=5';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'ff10e95f32msh503387e8fbee1a1p1c74c7jsn988b5d2e507c',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	setMusic(result);
	console.log(result);
    
} catch (error) {
	setMusic(error);
}
 }

 useEffect(()=>{
    getMusic();
 },[])
 


 return (
    <div className='flex flex-col'>
        <div className="w-full flex flex-between items-center flex-col mt-4 mb-10">
            <h2 className="font-bold text-3xl text-white">Discover {genreTitle}</h2>
            <select name="" id="" onChange={()=>{}}
                className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none mt-5"
            >
                {genres.map((genre)=> <option key={genre.value}>{genre.title}</option>)}
            </select>
        </div>
        <div className='flex flex-wrap justify-center gap-8'>
            {   music?.albums?.items.map((musicData)=>(
                <SongCard  
                 imag = {musicData?.data?.coverArt?.sources[0]?.url} 
                 song = {musicData?.data?.name}
                 isPlaying = {isPlaying}
                 activeSong = {activeSong}
                 uri = {musicData?.data?.uri}
                 />
                 
            ))}
        </div>
    </div>
 )

}
export default Discover;
