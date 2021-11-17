import { GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { authService } from "fbase";
import React from "react";
import AuthForm from "components/AuthForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faGoogle, faGithub } from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

const AuthContainer = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
	justify-content: center;
	align-items: center;
`;

const BtnContainer = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	max-width: 320px;
`;

const SocialLoginBtn = styled.button`
	cursor: pointer;
	border-radius: 20px;
	border: none;
	padding: 10px 0px;
	font-size: 12px;
	text-align: center;
	width: 150px;
	background: white;
	cursor: pointer;
`;

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
		}
	}

	return (
		<AuthContainer>
			<FontAwesomeIcon
				icon={faTwitter}
				color={"#04AAFF"}
				size="3x"
				style={{ marginBottom: 30 }}
			/>
			<AuthForm />
			<BtnContainer>
				<SocialLoginBtn onClick={onSocialClick} name="google">
					Continue with Google <FontAwesomeIcon icon={faGoogle} />
				</SocialLoginBtn>
				<SocialLoginBtn onClick={onSocialClick} name="github">
					Continue with Github <FontAwesomeIcon icon={faGithub} />
				</SocialLoginBtn>
			</BtnContainer>
		</AuthContainer>
	);
};

export default Auth;