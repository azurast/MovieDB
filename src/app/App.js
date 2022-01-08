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

  function fetchMoviesByGenre(genre) {
    const res = fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}&with_watch_monetization_types=flatrate`, {
      method: "GET"
    }).then(response => response.json())
      .then(movies => {
        let listObject = {
            listName: genre.name,
            movies: movies.results
        }
        console.log("Object", listObject)
        setMoviesList(moviesList => [...moviesList, listObject])
      }).catch(error => console.error(error))
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`, {
      method: "GET"
    }).then(response => response.json()).then(response => {
      const requests = []
      response.genres.forEach(each => {
        requests.push(fetchMoviesByGenre(each))
      })
      Promise.all(requests)
    }).catch(error => console.error(error))
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
            <MovieList title={list.listName} >
              {
                list.movies.map((movie) => {
                  return <MovieCard title={movie.title} image={`https://image.tmdb.org/t/p/w200${movie["poster_path"]}`}/>
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
