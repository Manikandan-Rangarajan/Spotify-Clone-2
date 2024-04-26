import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

import { Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopCharts = () => {
  // const { data, isFetching, error } = useGetTopChartsQuery();
  // const { activeSong, isPlaying } = useSelector((state) => state.player);

  // if (isFetching) return <Loader title="Loading Top Charts" />;

  // if (error) return <Error />;
  const [music, setMusic] = useState([]);
  const { activeSong, isPlaying } = useSelector((state) => state.player);


  const getMusic = async() => {
    const url = 'https://spotify23.p.rapidapi.com/artist_singles/?id=2w9zwq3AktTeYYMuhMjju8&offset=0&limit=20';
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
    
} catch (error) {
	setMusic(error);
}
 }

 useEffect(()=>{
    getMusic();
 },[])




  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Discover Top Charts</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
      {   music?.data?.artist?.discography?.singles?.items.map((musicData)=>(
                <SongCard  
                 imag = {musicData?.releases?.items?.coverArt?.sources?.url} 
                 song = {musicData?.releases?.items?.name}
                 isPlaying = {isPlaying}
                 activeSong = {activeSong}
                 />
                 
            ))}
      </div>
    </div>
  );
};

export default TopCharts;
