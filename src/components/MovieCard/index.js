import React from "react";
import {Title, Card, Image} from "./style"

const MovieCard = (props) => {
  const {title, image} = props
  console.log('image', image)
  return (
    <Card>
      <img
        src={image}
        style={{
          background: "no-repeat",
          backgroundSize: "auto 50%",
        }}
      />
    </Card>
  );
}

export default MovieCard