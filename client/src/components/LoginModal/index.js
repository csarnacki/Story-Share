import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';

const AnimatedModal = styled(animated.div)`
background-color: rgba(0, 0, 0, 0.8);
  padding: 3em;
  height: 550px;
  border-radius: 10px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

const LoginModal = ({ onClose, onLoginSuccess, onNavigateToSignup }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const springProps = useSpring({
        opacity: 1,
        transform: "translateX(0)",
        from: { opacity: 0, transform: "translateX(100%)" },
        config: { tension: 0, friction: 0, }
    });

    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: { email: username, password: password },
            });
            Auth.login(data.login.token);
            onLoginSuccess({ username });
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-40" aria-hidden="true"></div>
            <AnimatedModal style={springProps} className="rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full sm:p-6 bg-app-color text-inside font-marvel">
                <h3 className="text-3xl leading-6 font-bold text-inside text-stroke-black">
                    Login
                </h3>
                <form onSubmit={handleSubmit} className="mt-4">
                    <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 placeholder-gray-500 text-black text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-button-pink mb-2" required />
                    <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 placeholder-gray-500 text-black text-xl border rounded-md focus:outline-none focus:ring-2 focus:ring-button-pink mb-4" required />
                    <button type="submit" className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-button-pink text-xl font-medium text-inside hover:bg-button-yellow hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-yellow sm:text-lg">Login</button>
                </form>
                {/* Close the modal when the link is clicked */}
                <p className="mt-4 text-lg">Don't have an account? <Link to="/signup" className="text-app-color hover:underline" onClick={onNavigateToSignup}>Sign up for StoryShare</Link></p>
                <button type="button" className="mt-5 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-app-color text-xl font-medium text-inside hover:bg-button-yellow hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-button-yellow sm:text-lg" onClick={onClose}>Close</button>
            </AnimatedModal>
        </div>
    );
};

export default LoginModal;