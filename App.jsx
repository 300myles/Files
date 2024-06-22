import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route
} from "react-router-dom";
import Error from "./pages/Error";
import { loader as allMoviesLoader } from "./components/GetMovies";
import Login, { loader as loginLoader, action as loginAction } from "./pages/Login";
import auth from "./utilities.js";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Layout from "./pages/Layout"

const  SearchIcon = "./images/search.svg";

const Starter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    searchMovies("Batman");
  }, []);

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  };

  return (
    <div className="app">
      <h1>MovieLand</h1>

      <div className="search">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <MovieCard movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route 
          path="/"
          loader={allMoviesLoader}
          errorElement={<Error />}
          element={<Home />}
        />
        
        <Route 
          path="/search"
          errorElement={<Error />}
          element={<Search />}
        />
        
        <Route
          path = "/login"
          loader = {loginLoader}
          action = {loginAction}
          errorElement = {<Error />}
          element = {<Login />}
        />
      
      <Route
        path = "/*"
        errorElement = {<Error />}
        element = {<NotFound />}
      />
    </Route>
  ))
  
  
const App = () =>  {
  return (
  <RouterProvider router={router}/>
);
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
