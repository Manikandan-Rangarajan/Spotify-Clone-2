import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
  // const [country, setCountry] = useState('');
  // const [loading, setLoading] = useState(true);
  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  // useEffect(() => {
  //   axios
  //     .get(`https://geo.ipify.org/api/v2/country?apiKey=at_3guQk9tJ0FEj0SUM7lhh6gCdtmTNj`)
  //     .then((res) => setCountry(res?.data?.location.country))
  //     .catch((err) => console.log(err))
  //     .finally(() => setLoading(false));
  // }, [country]);

  const limit = 0
  const { activeSong, isPlaying } = useSelector((state) => state.player);
 const genreTitle = 'Pop';   

 const [music, setMusic] = useState([]);

 const getMusic = async() => {
  const url = 'https://spotify23.p.rapidapi.com/albums/?ids=3IBcauSj5M2A6lTeffJzdv';
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
  console.log(test)
} catch (error) {
	setMusic(error);
}
 }

 useEffect(()=>{
    getMusic();
 },[])

const test = async ()=>{
  music?.albums?.name
}
  // if (isFetching && loading) return <Loader title="Loading Songs around you..." />;

  // if (error && country !== '') return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Albums you like</h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        { music?.albums?.map((musicData)=>(
                <SongCard  
                 imag = {musicData?.images[0]?.url} 
                 song = {musicData?.name}
                 isPlaying = {isPlaying}
                 activeSong = {activeSong}
                 uri = {musicData?.artists?.uri}
                 />
                 
        ))}
      </div>
    </div>
  );
};

export default CountryTracks;
