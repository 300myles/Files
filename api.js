import React from "react";

const API_KEY = '1d5b80f4a2cdafc3280ef64abf5de7a7'

async function sleep (ms) {
  let count = localStorage.getItem("sleep-count") || 0;
  if (count === 0) {
    count++
    localStorage.setItem("sleep-count", count)
    setTimeout(() => {
      localStorage.removeItem("sleep-count")
    }, 20000)
    return new Promise(resolve => {
      setTimeout(resolve, ms)
    });
  } else {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 0)
    })
  }
}

export async function trendingMovies (page) {
  await sleep(1000)
  const trending = await /*Promise.all ([*/
    fetch(`https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}&page=${page}`).then(res => {
      if (!res.ok) {
        throw {
          message: "Failed to generate movies",
          statusText: res.statusText, 
          status: res.status
        }
      }
      return res.json()
    });
  //console.log(trending)
  return trending;
}

export async function popularMovies (page) {
  const popular = await fetch(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1d5b80f4a2cdafc3280ef64abf5de7a7&page=${page}`).then(res => {
      if (!res.ok) {
        throw {
          message: "Failed to generate movies",
          statusText: res.statusText, 
          status: res.status
        }
      }
      return res.json()
    });
  
  return popular;
}

export async function movieData (id) {
  //await sleep(500)
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=1d5b80f4a2cdafc3280ef64abf5de7a7`
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to generate movies",
      statusText: res.statusText, 
      status: res.status
    }
  }
  const data = await res.json();
  return data
}

export async function searchMovies (search, page) {
  const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&api_key=${API_KEY}&page=${page}`).then(res => {
    if (!res.ok) {
      throw {
        message: "Failed to generate movies",
        statusText: res.statusText,
        status: res.status
      }
    }
    return res.json()
  });
  
  return data;
}