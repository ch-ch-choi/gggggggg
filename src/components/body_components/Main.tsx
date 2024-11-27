import styled from "styled-components";

const Main = styled.div<{maxHeight: string, spanNumber: number, router: string}>`
  grid-column-start: span ${(props) => props.spanNumber};

  width: ${(props) => props.router === 'body' ? "100%" : "100%" }; // 이거 원래 888이 아니라 960px 이었음
  min-height: 480px;
  max-height: ${(props) => props.maxHeight};

  justify-self: center;
  // background-color: tomato;
  position: relative;

  display: flex;
  justify-content: center;

  z-index: ${(props) => props.router === 'body' ? undefined : "1" };

    @media (max-width: 1640px) {
      width: ${(props) => props.router === 'body' ? "100%" : "100%" };
    }
`;

export default Main;