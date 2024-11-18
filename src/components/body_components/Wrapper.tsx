import styled from "styled-components";

const Wrapper = styled.div<{headerHeight: string}>`
  display: grid;
  grid-template-rows: ${(props) => props.headerHeight} auto ${(props) => props.headerHeight};
  grid-template-columns: auto 1fr auto ;
  height: 100vh;
  min-width: 1280px;
  max-height: 100vh;
  overflow: hidden;
  /* position: absolute; */
`;

export default Wrapper;