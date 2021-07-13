import React,{useEffect, useState} from 'react';
import axios from './axios'
import requests from './requests';
import "./Row.css";
import Youtube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url="https://image.tmdb.org/t/p/original/";


const Row=({fetchUrl,title,isLargeRow})=>{
    const [movies,setMovies]=useState([]);
    const [trailerUrl,setTrailerUrl]=useState("");


    const fetchData= async ()=>{
        const request=await axios.get(fetchUrl);
        console.log(request);
        setMovies(request.data.results);
        return request
    };

    useEffect(()=>{

        fetchData();
    },[fetchUrl]);
    

    const opts={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1
        }
    };
    const handleClick=(movie)=>{
        if(trailerUrl){
            setTrailerUrl("")
        }else{
            movieTrailer(movie?.name ||"")
            .then(url=>{
                const urlParams=new URLSearchParams(new URL(url).search);
                console.log('urlParams',urlParams)
                setTrailerUrl(urlParams.get('v'))
            }).catch(error=>console.log(error))
        }

    }

    const renderMovies=movies.map((movie)=>{
        return <img onClick={()=>handleClick(movie)} key={movie.id} className={`row_poster ${isLargeRow && "row__posterLarge"}`}
                src={`${base_url}${isLargeRow?movie.poster_path:movie.backdrop_path}`} 
                alt={movie.name}
            />
    })
    
    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {renderMovies}

            </div>
            
        {trailerUrl && <Youtube videoId={trailerUrl} opts={opts}/>}
        </div>
    )
}
export default Row;