import styled from "styled-components";

const Title = styled.h1`
  font-size: 2em;
  text-align: center;
  color: #ae2012;
  text-align: left;
  padding: 16px;
  margin: 0 0 0 0.5em;
`;

const MessageText = styled.h3`
  font-weight: bold;
  color: white;
  padding-left: 16px;
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  padding: 0 8px 0 8px;
  margin: 0 0.5em 0 0.5em;
`

export {Title, ListContainer, MessageText}