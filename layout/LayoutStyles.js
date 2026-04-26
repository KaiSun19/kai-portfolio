import styled from "styled-components";

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  height: 100%;

  &.short-content {
    height: 100vh;
  }
`;
