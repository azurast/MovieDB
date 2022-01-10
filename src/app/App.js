import './App.css';
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import {useEffect, useState} from "react";
import {MessageText} from "../components/MovieList/style";

function App() {
  let counter = 0
  const [myList, setMyList] = useState([])
  const [moviesList, setMoviesList] = useState([])
  const [backgroundImages, setBackgroundImages] = useState([])

  function fetchMoviesByGenre(genre) {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre.id}&with_watch_monetization_types=flatrate`, {
      method: "GET"
    }).then(response => response.json())
      .then(movies => {
        let listObject = {
            listName: genre.name,
            movies: movies.results
        }
        setMoviesList(moviesList => [...moviesList, listObject])
        listObject.movies.forEach((movie) => {
         setBackgroundImages(backgroundImages => [...backgroundImages, `https://image.tmdb.org/t/p/w200${movie["backdrop_path"]}`])
        })
      }).catch(error => console.error(error))
  }

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&language=en-US`, {
      method: "GET"
    }).then(res => res.json()).then(response => {
      const requests = []
      response.genres.forEach(each => {
        requests.push(fetchMoviesByGenre(each))
      })
      Promise.all(requests).then(response => console.log('===response', response))
    }).catch(error => console.error(error))
  }, [])

  return (
    <div className="App">
      <NavBar background="https://image.tmdb.org/t/p/w500/xPpXYnCWfjkt3zzE0dpCNME1pXF.jpg"/>
      {/*My List*/}
      <div style={{ height: "200px" }}/>
      <MovieList title="My List" key="myList" style={{ marginTop: "200px" }}>
        {
          myList.length <= 0
            ? <MessageText>“Nothing here! Scroll to discover more️</MessageText>
            : <>
              {
                myList.map((movie) => {
                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      myList={myList}
                      setMyList={setMyList}
                      isMyList={true}
                    />
                  )
                })
              }
            </>
        }
      </MovieList>
      {/*Others*/}
      {
        moviesList.map((list) => {
          return (
            <MovieList title={list.listName} key={list.listName}>
              {
                list.movies.map((movie) => {
                  return (
                    <MovieCard
                      key={movie.id}
                      movie={movie}
                      myList={myList}
                      setMyList={setMyList}
                      isMyList={false}
                    />
                  )
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
