import styled from "styled-components";

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: palevioletred;
  text-align: left;
  padding: 16px;
  margin: 0;
`;

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 8px 0 8px;
`

export {Title, ListContainer}