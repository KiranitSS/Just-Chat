import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Logo from "../assets/Logo.png";

function Contacts({ contacts, currentUser }) {
    const [currentUserName, setCurrentUserName] = useState(undefined);
    const [currentUserImage, setCurrentUserImage] = useState(undefined);
    const [currentSelected, setCurrentSelected] = useState(undefined);

    useEffect(() => {
        if (currentUser) {
            setCurrentUserImage(currentUser.avatarImage);
            setCurrentUserName(currentUser.username);
        }

        const changeCurrentUser = (index, contact) => {

        }
    }, [currentUser]);

    return (
        <>
            {
                currentUserImage && currentUserName && (
                    <Container>
                        <div className="brand">
                            <img src={Logo} alt="logo" />
                        </div>
                        <div className="contacts">
                            {
                                contacts.map((contact, index) => {
                                    return (
                                        <div
                                            className={`contact ${index === currentSelected ? "selected" : ""}`}
                                            key={index}
                                        >
                                            <div className="avatar">
                                                <img
                                                    src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                                                    alt="avatar" />
                                            </div>
                                            <div className="username">
                                                <h3>{contact.username}</h3>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="current-user">
                            <div className="avatar">
                                <img
                                    src={`data:image/svg+xml;base64,${currentUserImage}`}
                                    alt="avatar" />
                            </div>
                            <div className="username">
                                <h1>{currentUserName}</h1>
                            </div>
                        </div>
                    </Container>
                )
            }
        </>
    );
}

export default Contacts;

const Container = styled.div`
`;