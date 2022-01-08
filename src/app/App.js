import './App.css';
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import {useEffect, useState} from "react";

function App() {
  const [myList, setMyList] = useState([])
  const [moviesList, setMoviesList] = useState([])
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
        setMoviesList(moviesList => [...moviesList, listObject])
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
      Promise.all(requests)
    }).catch(error => console.error(error))
  }, [])

  return (
    <div className="App">
      <NavBar/>
      {/*My List*/}
      <MovieList title="My List" key="myList">
        {
          myList.length <= 0
            ? "Nothing on the list"
            : <>
              {
                myList.map((movie) => {
                  return (
                    <MovieCard
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
            <MovieList title={list.listName} >
              {
                list.movies.map((movie) => {
                  return (
                    <MovieCard
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
