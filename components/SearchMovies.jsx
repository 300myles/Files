import React, { Suspense } from "react";
import {
  Link,
  defer,
  Await
} from "react-router-dom";
import Spinner from "./Spinner";
import { searchMovies } from "../api.js";
import Movies from "./Movies";
import { Empty } from "./utilities";

function getMovies (search) {
  const turnOut1 = searchMovies(search, 1);
  const turnOut2 = searchMovies(search, 2);
  
  const data = Promise.all([ turnOut1, turnOut2 ])
  return defer({ data })
}

const SearchMovies = (props) => {
  const { search } = props;
  const moviesData = getMovies(search);
  
  const renderMovies = (loadedMovies) => {
    const movieBox = [
      ...loadedMovies[0].results, 
      ...loadedMovies[1].results
    ]
    
    const movies = Movies(movieBox);
    return movies;
  }
  return (
    <Suspense fallback={<Spinner />}>
      <Await resolve={moviesData.data}>
        {renderMovies.length > 0? renderMovies : <Empty />}
      </Await>
    </Suspense>
  )
}

export default SearchMovies;