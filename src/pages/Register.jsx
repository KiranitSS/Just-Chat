import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/Logo.png";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { registerRoute } from "../utils/APIRoutes";

function Register() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
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
            const { password, username, email } = values;
            const { data } = await axios.post(registerRoute, {
                username,
                email,
                password
            }).catch(err => { console.log(err.message) });

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
        const { password, confirmPassword, username, email } = values;

        if (password !== confirmPassword) {
            toast.error("Passwords should be same.",
                toastOptions
            );
            return false;
        } else if (username.length < 4) {
            toast.error("Username should be greater than 3 characters.",
                toastOptions
            );
            return false;
        } else if (password.length < 8) {
            toast.error("Password should be equal or greater than 8 characters.",
                toastOptions
            );
            return false;
        } else if (email === "") {
            toast.error("Email is required.",
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
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={e => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={e => handleChange(e)}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="confirmPassword"
                        onChange={e => handleChange(e)}
                    />
                    <button type="submit">Register</button>
                    <span>
                        Already has an account? <Link to="/login">Login</Link>
                    </span>
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
    background-color: #e08c0d;

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
            width: 100#;
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

export default Register;