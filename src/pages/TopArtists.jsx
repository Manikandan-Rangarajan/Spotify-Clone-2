import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


import { ArtistCard, Error, Loader, SongCard } from '../components';
import { useGetTopChartsQuery } from '../redux/services/shazamCore';

const TopArtists = () => {
  // const { data, isFetching, error } = useGetTopChartsQuery();

  // if (isFetching) return <Loader title="Loading artists..." />;

  // if (error) return <Error />;

  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [music, setMusic] = useState([]);

 const getMusic = async() => {
  const url = 'https://spotify23.p.rapidapi.com/artist_appears_on/?id=2w9zwq3AktTeYYMuhMjju8';
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
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Top artists</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {music?.data?.artist?.relatedContent?.appearsOn?.items.map((musicData) => 
            <SongCard 
                 imag = {musicData?.releases?.items[0]?.coverArt?.sources[0]?.url} 
                 song = {musicData?.releases?.items[0]?.name}
                 uri = {music?.data?.artist?.uri}
                 isPlaying = {isPlaying}
                 activeSong = {activeSong}
               />)}
      </div>
    </div>
  );
};

export default TopArtists;
