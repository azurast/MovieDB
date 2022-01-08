import React from "react";
import {Card} from "./style"

const MovieCard = (props) => {
  const {title, image} = props

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