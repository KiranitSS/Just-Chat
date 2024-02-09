import React, { useState } from "react";
import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

export default function ChatInput({handleSendMessage}) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState("");

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emoji, event) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const sendChat = (event) => {
        event.preventDefault();
        if(msg.length > 0){
            handleSendMessage(msg);
            setMsg("");
        }
    }

    return (
        <Container>
            <div className="button-container">
                <div className="emoji">
                    <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                    {
                        showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />
                    }
                </div>
            </div>
            <form className="input-container" onSubmit={(e) => sendChat(e)}>
                <input 
                type="text" 
                placeholder="Message" 
                value={msg} 
                onChange={(e) => setMsg(e.target.value)} />
                <button type="submit">
                    <IoMdSend />
                </button>
            </form>
        </Container>
    )
}

const Container = styled.div`
display: grid;
align-items: center;
grid-template-columns: 5% 95%;
padding: 0 2rem;
background-color: #ffffff39;
.button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
        position: relative;
        svg {
            font-size: 1.5rem;
            color: #ffff00c8;
            cursor: pointer;
        }
        .EmojiPickerReact {
            position: absolute;
            top: -460px;
            background-color: #5b0047;
            box-shadow: 0 5px 10px #ba1094;
            border: none;
            .epr-body  {
                scrollbar-color: #ffffff39 transparent;
                scrollbar-width: thin;
                &::-webkit-scrollbar{
                    width: 0.3rem;
                    &-thumb {
                        background-color: #ffffff39;
                    }
                }
            }
            .epr-category-nav {
                button {
                   color: white;
                }
                .epr-btn {
                    filter: saturate(0%) brightness(150%);
                }
            }
            .epr-search-container {
                input {
                    background-color: transparent;
                    border-color: #ffff00c8;
                    color: white;
                }
                & ::placeholder {
                    color: white;
                    opacity: 0.9;
                }
            }
            .epr-emoji-category-label {
                color: white;
                background-color: #5b0047;
            }

            .epr_-99h9r1 {
                color: white;
            }
        }
    }  
}
.input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-content: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
        width: 90%;
        background-color: transparent;
        border: none;
        color: white;
        font-size: 1.3rem;
        padding-left: 1rem;
        &::selection {
            background-color: #e28900;
            color: #fff2e2;
        }
        &::placeholder {
            color: white;
            opacity: 0.9;
        }
        &:focus {
            outline: none;
        }
    }
    button {
        padding: 0.2rem 2rem;
        border-radius: 3rem;
        border: none;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #8b006c;
        color: white;
        svg {
            font-size: 1.8rem;
        }
    }
}
`;