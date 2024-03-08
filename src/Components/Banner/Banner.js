import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { APi_key, baseUrl, imageUrl } from '../../constants/constants';


import './Banner.css';

function Banner() {


  const [movie, setMovie] = useState(null)
  useEffect(() => {
    axios.get(`${baseUrl}/trending/all/week?api_key=${APi_key}&language=en-US`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMovie(response.data.results[0])
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (

    <div style={{ backgroundImage: `url(${movie ? imageUrl + movie.backdrop_path : ''})` }} className='banner'>
      <div className='content'>
        <h1 className='title'>{movie ? movie.title : ''}</h1>
        <div className='banner-button'>
          <button className='button'>play</button>
          <button className='button'>My List</button>
        </div>
        <h1 className='description'>{movie ? movie.overview : ''}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
