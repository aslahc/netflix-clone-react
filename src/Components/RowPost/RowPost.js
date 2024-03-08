import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import './RowPost.css'
import axios from '../../axios'
import {  imageUrl ,APi_key} from '../../constants/constants'

function RowPost(props) {

  const [movies, setMovies] = useState([]);
  const [urlId, setUrlId] = useState('');

  useEffect(() => {
    axios.get(props.url)
      .then(response => {
        console.log("This is second data", response.data);
        setMovies(response.data.results);
      })
      .catch(err => {
        alert('Network error');
      });
  }, [props.url]); // added props.url to dependency array

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleMovie = (id) => {
    console.log(id);
    axios.get(`/movie/${id}/videos?api_key=${APi_key}&language=en-US`)
      .then(response => {
        console.log(response.data);
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0].key); // corrected accessing key
        } else {
          console.log("Trailer not available");
        }
      })
      .catch(err => {
        console.log("Error fetching trailer:", err);
      });
  };

  return (
    <div className='row'>
      <h2>{props.title}</h2>
      <div className='posters'>
        {movies.map((obj) =>
          <img
            key={obj.id} // added key prop for unique identifier
            onClick={() => handleMovie(obj.id)}
            className={props.isSmall ? 'smallPoster' : 'poster'}
            src={`${imageUrl}${obj.backdrop_path}`} // corrected image URL concatenation
            alt='poster'
          />
        )}
      </div>
      {urlId && <YouTube opts={opts} videoId={urlId} />} {/* Render YouTube component if urlId exists */}
    </div>
  );
}


export default RowPost
