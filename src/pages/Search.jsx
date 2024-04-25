import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Error, Loader, SongCard } from '../components';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {

  const [music, setMusic] = useEffect([]);

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

  const SearchQuery = async (searchTerm)=>{
    const fetch = require('node-fetch');

const url = `https://spotify23.p.rapidapi.com/album_metadata/?id=3IBcauSj5M2A6lTeffJzdv?q=${searchTerm}`;
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'c343a4e2a7mshf63011433f1f3cdp1a5ce1jsne13e58cee6bd',
    'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.text();
	console.log(result);
} catch (error) {
	console.error(error);
}
  }

  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = SearchQuery(searchTerm);

  const songs = async()=>{(music?.playlists?.items?.data?.map((song) => song.track))}

  if (isFetching) return <Loader title={`Searching ${searchTerm}...`} />;

  if (error) return <Error />;

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">Showing results for <span className="font-black">{searchTerm}</span></h2>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        { music?.users?.items.map((musicData) => (
          <SongCard
            // key={musicData.key}
            song = {musicData?.data?.displayName}
            isPlaying = {isPlaying}
            activeSong = {activeSong}
            data={musicData}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
