import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { API_KEY } from './context';
import { NavLink } from 'react-router-dom';

const SingleMovie = () => {
  const {id} = useParams();

  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getMovieData = async (url) =>{
    try{
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if(data.Response === "True"){
          setMovie(data);
          setIsLoading(false);
      }

  }
  catch(Error){
      console.log(Error);
  }
  }

  useEffect(()=>{
    const timer = setTimeout(()=>{
        getMovieData(API_KEY+'&t='+id);
  },800);

  return () => clearTimeout(timer);

  },[id])

  if (isLoading) {
    return (
      <section className="movie-section ">
        <div className="loading">Loading....</div>;
      </section>
    );
  }

  return (
    <section className="movie-section">
      <div className="movie-card">
        <figure>
          <img src={movie.Poster} alt="" />
        </figure>
        <div className="card-content">
          <p className="title">{movie.Title}</p>
          <p className=""></p>
          <p className="card-text">{movie.Released}</p>
          <p className="card-text">{movie.Genre}</p>
          <p className="card-text">{movie.imdbRating} / 10</p>
          <p className="card-text">{movie.Country}</p>
          <NavLink to="/" className="back-btn">
            Go Back
          </NavLink>
        </div>
      </div>
    </section>
  )
}

export default SingleMovie