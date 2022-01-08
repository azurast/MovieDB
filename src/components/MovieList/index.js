import React from "react";
import {ListContainer, Title} from "./style";

const MovieList = (props) => {
  const {title, children} = props
  return (
    <div>
      <Title>{title}</Title>
      <ListContainer>
        {children}
      </ListContainer>
    </div>
  );
}

export default MovieList