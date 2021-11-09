import React, { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { authService } from "fbase";
import PropTypes from "prop-types";

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
			<form onSubmit={onSubmit}>
				<input name="email" type="text" placeholder="Email" required value={email} onChange={onChange}/>
				<input name="password" type="password" placeholder="Password" required value={password} onChange={onChange}/>
				<input type="submit" value={newAccount ? "Create Account" : "Log in"} />
				{error}
			</form>
			<span onClick={toggleAccount}>{newAccount ? "Sign in" : "Create Account"}</span>
		</>
	)
}

AuthForm.propTypes = {
	email: PropTypes.string.isRequired,
	password: PropTypes.string.isRequired,
}


export default AuthForm;