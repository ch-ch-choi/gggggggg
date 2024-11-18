import styled from "styled-components";

const Main = styled.div<{maxHeight: string, spanNumber: number, router: string}>`
  grid-column-start: span ${(props) => props.spanNumber};

  width: ${(props) => props.router === 'body' ? "960px" : "100%" };
  min-height: 480px;
  max-height: ${(props) => props.maxHeight};

  justify-self: center;
  // background-color: tomato;
  position: relative;

  display: flex;
  justify-content: center;

    @media (max-width: 1640px) {
      width: ${(props) => props.router === 'body' ? "888px" : "100%" };
    }
`;

export default Main;