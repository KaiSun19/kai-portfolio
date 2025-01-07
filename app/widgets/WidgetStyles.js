import styled from "styled-components";

export const GridContainer = styled.section`
  display: flex;
  width : 100%;
  justify-content : flex-start;
  flex-direction : row;
  flex-wrap : wrap;
  gap : 3rem;
  padding: 3rem;
  @media ${(props) => props.theme.breakpoints.sm} {
    flex-direction: column;
    padding: 2rem;
    padding-bottom: 0;
  }
`;
export const WidgetCard = styled.div`
  border-radius: 10px;
  box-shadow: 3px 3px 20px rgba(80, 78, 78, 0.5);
  text-align: center;
  width: 300px;
  height : fit-content;
  padding: 1rem;
  @media ${(props) => props.theme.breakpoints.sm} {
    width: 100%;
  }
`;

export const CardInfo = styled.p`
  width: 100%;
  padding: 0 25px;
  color: #ffffff80;
  font-style: 2rem;
  line-height: 24px;
  text-align: center;
  min-height: 150px;
  margin: 1rem 0;
  @media ${(props) => props.theme.breakpoints.sm} {
    padding: 1rem;
  }
`;

export const WidgetIcon = styled.picture`
    display : flex;
    justify-content : center;
    & > svg {
        width : 3rem;
        height : 3rem;
    }
`