import logo from '../logo.svg';
import './App.css';
import NavBar from "../components/navBar";
import MovieList from "../components/movieList";
import MovieCard from "../components/movieCard";

// Sample Genres Array
let genres = ["Horror", "Romance", "Comedy"]

function App() {
  return (
    <div className="App">
      <NavBar/>
      {/*My List*/}
      <MovieList title="My List">
        <MovieCard/>
      </MovieList>
      {/*Fetch Genres & Iterate as a List*/}
      {
        genres.map((genre) => {
          return (
            <MovieList title={genre}>
              <MovieCard/>
            </MovieList>
          )
        })
      }
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.js</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
