import './App.css';
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import {useEffect, useState} from "react";

function App() {
  const [myList, setMyList] = useState([])
  const [moviesList, setMoviesList] = useState([])
  const [backgroundImages, setBackgroundImages] = useState([])
  const [counter, setCounter] = useState(0)

  function fetchMoviesByGenre(genre) {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}&with_watch_monetization_types=flatrate`, {
      method: "GET"
    }).then(response => response.json())
      .then(movies => {
        let listObject = {
            listName: genre.name,
            movies: movies.results
        }
        // console.log("Object", listObject)
        setMoviesList(moviesList => [...moviesList, listObject])
        movies.results.forEach(movie => {
          setBackgroundImages(backgroundImages => [...backgroundImages, movie["backdrop_path"]])
        })
      }).catch(error => console.error(error))
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`, {
      method: "GET"
    }).then(res => res.json()).then(async response => {
      const requests = []
      console.log('====TEST')
      response.genres.forEach(each => {
        requests.push(fetchMoviesByGenre(each))
      })
      console.log('====TEST2')
      await Promise.all(requests).then(response => {
        console.log('====TEST3', response)
      })
    }).catch(error => console.error(error))
  }, [])

  useEffect(() => {
    var interval = setInterval(() => {
      setCounter(counter => ++counter)
    }, 7500)
  }, [counter])

  return (
    <div className="App">
      <NavBar image={backgroundImages[counter]}/>
      {/*My List*/}
      <div style={{ height: "200px" }}/>
      <MovieList title="My List" key="myList">
        {
          myList.length <= 0 ? "Nothing on the list" : <MovieCard title="Test" key="Test"/>
        }
      </MovieList>
      {/*Others*/}
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
