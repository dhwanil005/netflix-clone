import React, {useEffect, useState} from 'react'
import "./Banner.css"
import axios from './axios'
import requests from './Requests'

function Banner() {

    const [movie, setMovie] = useState([]);

    useEffect(() => {

        async function fetchMovie() {
            try {
                let response = await axios.get(requests.fetchNetflixOriginals);
                console.log("[ Banner ]: fetchMovie Response = ", response.data);
                // Set random Banner movie:
                setMovie( response.data.results[
                    Math.floor(Math.random() * response.data.results.length - 1)
                ])
            } catch (err) {
                console.log("[ Banner ]: fetchMovie Error = ", err);
            }
        }

        fetchMovie();
    }, []);
    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + '...' : string;
    }

  return (
    <header className="banner" 
    style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center"
    }}>
        <div className="banner__contents">
            <h1 className="banner__title">{movie?.title || movie?.name || movie?.original_name}</h1>
            <div className="banner__buttons">
                <button className="banner__button">Play</button>
                <button className="banner__button">My List</button>
            </div>
            <h1 className="banner__description"> {truncate(movie?.overview,150)}</h1>
        </div>
        <div className="banner--fadeBottom"/>   
            </header>
  )
}
export default Banner  