import styled from "styled-components";

const Header = styled.div<{ height: string }>`
  grid-column-start: span 3;
  position: relative;
  z-index: 1;
  // background-color: teal;
  height: ${(props) => props.height};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Header;