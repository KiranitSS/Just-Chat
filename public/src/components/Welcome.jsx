import styled from "styled-components";
import HandHi from "../assets/HandHi.gif";

export default function Welcome({ currentUser }) {
    return (
        <Container>
            <img src={HandHi} alt="hi" />
            <h1>
                Hi, <span>{currentUser.username}!</span>
            </h1>
            <h3>Please, select a chat to start.</h3>
        </Container>
    );
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
img {
    height: 25rem;
}
span {
    color: #8b006c;
}
`;