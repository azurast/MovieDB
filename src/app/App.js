import './App.css';
import NavBar from "../components/NavBar";
import MovieList from "../components/MovieList";
import MovieCard from "../components/MovieCard";
import {useEffect, useState} from "react";
import {MessageText} from "../components/MovieList/style";

function App() {
  const [myList, setMyList] = useState([])
  const [moviesList, setMoviesList] = useState([])
  const [backgroundImages, setBackgroundImages] = useState(["/xPpXYnCWfjkt3zzE0dpCNME1pXF.jpg"]);
  const [currentImage, setCurrentImage] = useState()

  /* Fetch Movies By Genre */
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
        listObject.movies.forEach((movie) => {
         setBackgroundImages(backgroundImages => [...backgroundImages, movie["backdrop_path"]])
        })
      }).catch(error => console.error(error))
  }

  /* Fetch Each Genre */
  useEffect(() => {
    setMoviesList([])
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

  /* Update Changes in 'myList' */
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList))
  }, [myList])

  /* Change Header Image Every 3,5 seconds */
  useEffect(() => {
    let counter = 0
    const interval = setInterval(() => {
      setCurrentImage(backgroundImages[counter])
      if (counter <= backgroundImages.length) {
        counter++;
      } else {
        counter = 0;
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages]);

  return (
    <div className="App">
      <NavBar background={`https://image.tmdb.org/t/p/w500${currentImage}`}/>
      {/*My List*/}
      <div style={{ height: "200px" }}/>
      <MovieList title="My List" key="myList" style={{ marginTop: "200px" }}>
        {
          myList.length <= 0
            ? <MessageText>Nothing here! Scroll to discover more️</MessageText>
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
