import React from 'react';
import { useParams } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import { DetailsHeader, Error, Loader, RelatedSongs } from '../components';

// import { useGetArtistDetailsQuery } from '../redux/services/shazamCore';

const ArtistDetails = () => {
  // const { id: artistId } = useParams();
  // const { activeSong, isPlaying } = useSelector((state) => state.player);
  // const { data: artistData, isFetching: isFetchingArtistDetails, error } = useGetArtistDetailsQuery(artistId);

  // if (isFetchingArtistDetails) return <Loader title="Loading artist details..." />;

  // if (error) return <Error />;

  const { activeSong, isPlaying } = useSelector((state) => state.player);
 
 const [music, setMusic] = useState([]);

 const getMusic = async() => {
  const url = 'https://spotify23.p.rapidapi.com/artists/?ids=2w9zwq3AktTeYYMuhMjju8';
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
     { music?.artists.map((musicData)=>    
      <DetailsHeader
        artistId={musicData?.id}
        artistData={musicData?.name}
        artistImage = {musicData?.images?.url}
      />)}

      <RelatedSongs
        data={music?.artists?.genres[1]}
        artistId={musicData?.id}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
