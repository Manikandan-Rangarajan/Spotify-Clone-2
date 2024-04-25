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
    const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=30 &numberOfTopResults=10';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'c343a4e2a7mshf63011433f1f3cdp1a5ce1jsne13e58cee6bd',
		'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
	}
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
	setMusic(result);
	console.log(result);
    log;
} catch (error) {
	setMusic(error);
}
 }

 useEffect(()=>{
    getMusic();
 },[])

 const log = async()=>{ console.log(music?.playlists?.items?.data?.uri)}
 


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
            {   music?.users?.items.map((musicData)=>(
                <SongCard  
                 imag = {musicData?.data?.image?.largeImageUrl} 
                 song = {musicData?.data?.displayName}
                 isPlaying = {isPlaying}
                 activeSong = {activeSong}
                 data = {data}
                 />
                 
            ))}
        </div>
    </div>
 )

}
export default Discover;
