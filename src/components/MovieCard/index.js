import React from "react";

const MovieCard = (props) => {
  const {title} = props
  return (
    <div>
      <p>{title}</p>
    </div>
  );
}

export default MovieCard