import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "fbase";
import React from "react";
import AuthForm from "components/AuthForm";

const Auth = () => {
	const onSocialClick = async(event) => {
		const { target: { name }} = event;
		let provider;
		try {
			if (name === "google") {
				provider = new GoogleAuthProvider();
			} else if (name === "github") {
				provider = new GithubAuthProvider();
			}
			await signInWithPopup(authService, provider);
		} catch(error) {
			console.log(error);
			const data = error;
		}
	}

	return (
		<div>
			<AuthForm />
			<div>
				<button onClick={onSocialClick} name="google">Continue with Google</button>
				<button onClick={onSocialClick} name="github">Continue with GitHub</button>
			</div>
		</div>
	);
};

export default Auth;