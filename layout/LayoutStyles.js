import styled from 'styled-components';

export const Container = styled.div`
max-width: 1280px;
width: 100%;
margin: auto;
display : flex;
flex-direction: column;
height : ${(props) => props.shortContent ? '100vh' : '100%'};
`;
