import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from "../components/Contacts";

function Chat() {
    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentChat, setCurrentChat] = useState(undefined);
    useEffect(() => {
        (async () => {
            if (!localStorage.getItem("just-chat-user")) {
                navigate("/login");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("just-chat-user")));
            }
        })()
    }, []);

    useEffect(() => {
        (async () => {
            if (currentUser) {
                if (currentUser.isAvatarImageSet) {
                    const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
                    setContacts(data.data);
                } else {
                    navigate("/setAvatar");
                }
            }
        })()
    }, [currentUser]);
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    }
    
    return (
        <Container>
            <div className="container">
                <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
            </div>
        </Container>
    )
}

const Container = styled.div`
height: 100vh;
width: 100vw;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 1rem;
background-color: #f1960d;
.container {
    height: 85vh;
    width: 85vw;
    background-color: #de8600;
    border: 0.3rem solid #8b006c;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width:1080px) {
        grid-template-columns: 35% 65%;
    }
}

`;

export default Chat;