import React from "react";
import { 
  Outlet, 
  Link
  } from "react-router-dom";
import Movies, { loader as movieLoader } from "../components/GetMovies";

const Home = () => {
  const searchMovie = (e) => {
    e.target.value
  }
  
  return(
    <div className="app">
      <h1>MovieLand</h1>
      
      <Link className="search-link" to="/search">
        <div className="search">
          <input
            placeholder="Search for movies"
          />
          <img
            src={SearchIcon}
            alt="search"
          />
        </div>
      </Link>
      
      <div className="container">
        <Movies />
      </div>
      
    </div>
  )
}

export default Home;