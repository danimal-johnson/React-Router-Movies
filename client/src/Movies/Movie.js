import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movie = (props) => {
  const [movie, setMovie] = useState({});
 
  console.log ("Getting movie " + props.title);

  useEffect(() => {
    let currentUrl = window.location.href;
    let urlArray = currentUrl.split("/");
    let id = Number(urlArray[urlArray.length - 1]);
    // change ^^^ that line and grab the id from the URL
    // You will NEED to add a dependency array to this effect hook
    console.log(currentUrl, urlArray, id);

    id = 1; // Until I can figure out dynamic routing

       axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(response => {
          setMovie(response.data);
        })
        .catch(error => {
          console.error(error);
        });

  },[/* window.location.href FIX DEPENDENCY ARRAY */ ]);
  
  // Uncomment this only when you have moved on to the stretch goals
  // const saveMovie = () => {
  //   const addToSavedList = props.addToSavedList;
  //   addToSavedList(movie)
  // }

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <h1>Save The Wrappers!</h1>
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button">Save</div>
    </div>
  );
}

export default Movie;
