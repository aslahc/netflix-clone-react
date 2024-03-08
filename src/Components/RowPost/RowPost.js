import React, { useEffect, useState } from 'react'
import './RowPost.css'
import axios from '../../axios'
import { baseUrl, APi_key, imageUrl } from '../../constants/constants'
function RowPost() {

  const [movies, setMovies] = useState([])
  useEffect(() => {
    axios.get(`${baseUrl}/discover/tv?api_key=${APi_key}&with_networks=213`).then(response => {
      console.log("this is secend data", response.data)
      setMovies(response.data.results)
    }).catch(err => {
      alert('Network error')
    })
  }, [])
  return (


    <div className='row'>
      <h2>Netflix Orginals</h2>
      <div className='posters'>
        {movies.map((obj) =>
          <img className='poster' src={`${imageUrl + obj.backdrop_path}`} alt='poster'></img>

        )}

      </div>
    </div>
  )
}

export default RowPost
