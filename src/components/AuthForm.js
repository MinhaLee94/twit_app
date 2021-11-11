import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fbase";
import PropTypes from "prop-types";
import styled from "styled-components";

const LoginForm = styled.form`
	width: 100%;
	max-width: 320px;
	display: flex;
	flex-direction: column;
`;

const LoginInput = styled.input`
	max-width: 320px;
	width: 100%;
	padding: 10px;
	border-radius: 30px;
	background-color: rgba(255, 255, 255, 1);
	margin-bottom: 10px;
	font-size: 12px;
	color: black;
`;

const SubmitBtn = styled(LoginInput)`
	text-align: center;
	background: #04aaff;
	color: white;
	margin-top: 10;
	cursor: pointer;
`;

const AuthError = styled.span`
	color: tomato;
	text-align: center;
	font-weight: 500;
	font-size: 12px;
`;

const AuthSwitch = styled.span`
	color: #04aaff;
	cursor: pointer;
	margin-top: 10px;
	margin-bottom: 50px;
	display: block;
	font-size: 12px;
	text-decoration: underline;
`;


const AuthForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [newAccount, setNewAccount] = useState(true);
	const [error, setError] = useState("");
	const onChange = (event) => {
		const { target: { name, value }} = event;
		if(name === "email") {
			setEmail(value);
		} else if (name === "password") {
			setPassword(value);
		}
	};
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			if(newAccount) {
				await createUserWithEmailAndPassword(authService, email, password);
			} else {
				await signInWithEmailAndPassword(authService, email, password);
			}
		} catch(error) {
			setError(error.message);
		}
	};
	const toggleAccount = () => setNewAccount((prev) => !prev);
	return (
		<>
			<LoginForm onSubmit={onSubmit}>
				<LoginInput name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
				<LoginInput name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
				<SubmitBtn type="submit" value={newAccount ? "Create Account" : "Log in"} />
				{error && <span>{error}</span>}
			</LoginForm>
			<AuthSwitch onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</AuthSwitch>
		</>
	)
}

AuthForm.propTypes = {
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
}


export default AuthForm;