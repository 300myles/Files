import React from "react";

const Movies = (moviesBOX) => {
  const movies = moviesBOX.map(movie => {
      const { 
        id, 
        title, 
        name, 
        poster_path, 
        media_type
      } = movie;
      const releaseDate = movie.release_date;
      const year = releaseDate.slice(0, 4);
      
      return (
        <Link 
          to={`/${movie.title || movie.name}?mid=${movie.id}`}
        key={movie.id}>
          <div className="movie" >
           
            <div>
              <p>{year}</p>
            </div>
           
            <div>
              <img src={poster_path !== "N/A" ? (IMG_PATH + movie.poster_path) : "https://via.placeholder.com/400"} alt={title || name} />
            </div>
           
            <div>
              <span>{media_type}</span>
              <h3>{title || name}</h3>
            </div>
            
          </div>
        </Link>
      )
      
    });
    return movies;
}