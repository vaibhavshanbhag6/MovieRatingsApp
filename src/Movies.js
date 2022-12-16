import React from 'react'
import { NavLink } from 'react-router-dom';
import { useGlobalContext } from './context'

const Movies = () => {
  const {movie, isLoading} = useGlobalContext();
  if (isLoading) {
    return (
      <section >
        <div className="loading">Loading....</div>;
      </section>
    );
  }
  return (
    <div>
    <section className='movie-page'>
    <div className='container grid grid-4-col'>
      {
        movie.map((curMovie)=>{
          return (
            <NavLink to={`/movie/${curMovie.Title}`} key={curMovie.imdbID}>
            <div className='crad'>
              <div className='card-info'>
              <h2>{curMovie.Title.length>15 ? curMovie.Title.substring(0,15)+"..." : curMovie.Title}</h2>
              <img src={curMovie.Poster} alt="Poster"/>
              </div>
            </div>
            </NavLink>
          )
          })
      }
      </div>
      </section>
    </div>
  )
}

export default Movies