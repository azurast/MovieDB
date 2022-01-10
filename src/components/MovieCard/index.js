import React, {useState} from "react";
import {Card, Overlay} from "./style"
// import {PrimaryButton} from "../Button/style";
import Button from "../Button";

const MovieCard = (props) => {
  const {movie, myList, setMyList, isMyList} = props
  const [showButton, setShowButton] = useState(false)

  function onAddButtonClick(e) {
    e.preventDefault()
    if (!myList.includes(movie)) {
      setMyList(myList => [...myList, movie])
    }
    console.log(myList)
  }

  function onRemoveButtonClick(e) {
    e.preventDefault()
    if (myList.includes(movie)) {
      const index = myList.indexOf(movie)
      myList.splice(index, 1)
      setMyList(myList)
    }
  }

  return (
    <Card>
      <Overlay
        onMouseEnter={() => setShowButton(true)}
        onMouseLeave={() => setShowButton(false)}
      >
        <img
          src={`https://image.tmdb.org/t/p/w200${movie["poster_path"]}`}
          style={{
            background: "no-repeat",
            backgroundSize: "auto 50%"
          }}
          alt={`${movie.title}Poster`}
        />

        <Button visible={showButton} onClick={isMyList ? onRemoveButtonClick : onAddButtonClick}>
          {
            isMyList ? "Remove" : "Add To List"
          }
        </Button>
      </Overlay>
    </Card>
  );
}

export default MovieCard