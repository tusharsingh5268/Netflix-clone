import React ,{useEffect, useState} from 'react';
import axios from './axios';
import requests  from './requests';
import './Banner.css'
const Banner=()=>{
    const [movie,setMovie]=useState([]);

    const fetchData=async ()=>{
        const response=await axios.get(requests.fetchNetflixOriginals);
        setMovie(response.data.results[Math.floor(Math.random()*response.data.results.length-1)]);
        return response
    }

    useEffect(()=>{
        fetchData()
    },[]);

    console.log('movie',movie);

    function truncate(str,n){
        return str?.length>n ?str.substr(0,n-1)+"...":str;
    }

    return (
        <header className='banner' style={{backgroundSize:'cover',backgroundImage:`url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,backgroundPosition:'center center'}}>
            <div className='banner__contents'>
                <h1 className='banner_title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner_buttons'>
                    <button className='banner_button'>Play</button>
                    <button className='banner_button'>My List</button>
                </div>
                <h1 className='banner_description'>
                    {truncate(movie?.overview,150)}
                </h1>


            </div>  
            <div className='banner--fadeBottom'></div>
        </header>
    )
};

export default Banner