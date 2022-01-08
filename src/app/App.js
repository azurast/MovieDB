import './App.css';
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import {useEffect, useState} from "react";

function App() {
  let sample = [
    {name: "Drama", id: 18},
    {name: "Family", id: 10751},
    {name: "Documentary", id: 99}
  ]

  const [myList, setMyList] = useState([])
  const [genresList, setGenresList] = useState([])
  const [moviesList, setMoviesList] = useState([])
  /*
  * moviesList = [
  *   .
  *   .
  *   .
  *   {
  *     genre: "genreName"
  *     movies: [
  *       movieTitle: "movieTitle"
  *       movieImage: "movieImage"
  *     ]
  *   },
  *   .
  *   .
  *   .
  * ]
  * */
  useEffect(() => {
    // TODO: Make this synchronous
    // 1. Get all genres, store it
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`, {
      method: "GET"
    }).then(response => response.json()).then(response => {
      console.log(response.genres)
      setGenresList(response.genres)
    }).catch(error => console.error(error))
    // 2. Use stored genre to fetch each movies
    sample.map((each) => {
      fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${each.id}&with_watch_monetization_types=flatrate`, {
        method: "GET"
      }).then(response => response.json()).then(response => {
        // console.log("Response", response)
        let listObject = {
            listName: each.name,
            movies: response.results
        }
        // console.log("Object", listObject)
        setMoviesList(moviesList => [...moviesList, listObject])
      }).catch(error => console.error(error))
    })
  }, [])

  return (
    <div className="App">
      <NavBar/>
      {/*My List*/}
      <MovieList title="My List" key="myList">
        {
          myList.length <= 0 ? "Nothing on the list" : <MovieCard title="Test" key="Test"/>
        }
      </MovieList>
      {/*Fetch Genres & Iterate as a List*/}
      {
        moviesList.map((list) => {
          return (
            <MovieList title={list.listName} key={list.listName}>
              {
                list.movies.map((movie) => {
                  return <MovieCard title={movie.title} key={movie.title}/>
                })
              }
            </MovieList>
          )
        })
      }
    </div>
  );
}

export default App;
