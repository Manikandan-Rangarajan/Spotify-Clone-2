/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  
  const [music, setMusic] = useState([]);

const getMusic = async() => {
  const url = 'https://spotify23.p.rapidapi.com/playlist_tracks/?id=37i9dQZF1DX4Wsb4d7NKfP&offset=0&limit=100';
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



  
  
  const ref = useRef(null);
  // eslint-disable-next-line no-unused-expressions
  if (ref.current) {
    if (isPlaying) {
      ref.current.play();
    } else {
      ref.current.pause();
    }
  }

  useEffect(() => {
    ref.current.volume = volume;
  }, [volume]);
  // updates audio element only on seekTime change (and not on each rerender):
  useEffect(() => {
    ref.current.currentTime = seekTime;
  }, [seekTime]);

  return (
    <audio
      src={music?.items[0]?.album?.tracks?.preview_url}
      ref={ref}
      loop={repeat}
      onEnded={onEnded}
      onTimeUpdate={onTimeUpdate}
      onLoadedData={onLoadedData}
    />
  );
};

export default Player;
