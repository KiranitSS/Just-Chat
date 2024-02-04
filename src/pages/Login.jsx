import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginRoute } from "../utils/APIRoutes";

function Login() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        password: "",
    });

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
    };

    useEffect(() => {
        if(localStorage.getItem("just-chat-user")) {
            navigate("/");
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
            const { password, username } = values;
            const { data } = await axios.post(loginRoute, {
                username,
                password
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }
            if (data.status === true) {
                localStorage.setItem("just-chat-user", JSON.stringify(data.user));
                navigate("/");
            }
        }
    };

    const handleChange = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    }

    const handleValidation = () => {
        const { password, username, } = values;

        if (username === "" || password === "") {
            toast.error("Email and password are required.",
                toastOptions
            );
            return false;
        }

        return true;
    }

    return (
        <>
            <FormContainer>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="brand">
                        <img src={Logo} alt="Logo" />
                        <h1>Just Chat</h1>
                    </div>
                    <input
                        type="text"
                        placeholder="Username"
                        name="username"
                        onChange={e => handleChange(e)}
                        min="3"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={e => handleChange(e)}
                    />
                    <button type="submit">Login In</button>
                    <span>Don't have an account? <Link to="/register">Register</Link></span>
                </form>
            </FormContainer>
            <ToastContainer />
        </>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #f1960d;

    .brand {
        display: flex;
        align-items: center;
        gap: 1rem;
        justify-content: center;

        img {
            height: 5rem;
        }

        h1 {
            text-transform: uppercase;
        }
    }
    
    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        background-color: #c57a09;
        border-radius: 2rem;
        padding: 3rem 5rem;
        border: 0.2rem solid #5b0047;

        input{
            background-color: transparent;
            padding: 1rem;
            border: 0.2rem solid #5b0047;
            border-radius: 0.4rem;
            color: white;
            width: 100%;
            font-size: 1rem;

            &:focus {
                border: 0.2rem solid #8b006c;
                outline: none;
            }
        }

        button {
            background-color: #8b006c;
            color: white;
            padding: 1rem 2rem;
            border: none;
            font-weight: bold;
            cursor: pointer;
            border-radius: 0.4rem;
            font-size: 1rem;
            text-transform: uppercase;
            transition: 0.5s ease-in-out;

            &:hover {
                background-color: #5b0047;           
            }
        }
        
        span {
            color: white;
            text-transform: uppercase;

            a {
                color: #8b006c;
                text-decoration: none;
                font-weight: bold;
            }
        }
    }
`;

export default Login;