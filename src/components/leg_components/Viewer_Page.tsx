import styled from "styled-components";

interface PageProps {
    viewMode: string;
  }

const Page = styled.img<PageProps>`
    /* background-color: teal; */
    height: 100%; width: auto;
    max-width: ${(props) => props.viewMode === "page" ? "100%" : "50%"};
    max-height: max-content;
    outline : 0.9px solid black;
`;

export default Page
