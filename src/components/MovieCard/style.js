import styled from "styled-components";

const Card = styled.div`
  padding: 8px;
  position: relative;
`;

const Overlay = styled.div`
  background-color: #0b090a;
  &:hover {
    opacity: 0.8;
  }
`

export {Card, Overlay}