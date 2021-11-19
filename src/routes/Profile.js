import { updateProfile } from "@firebase/auth";
import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";
import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const ProfileForm = styled.form`
	border-bottom: 1px solid rgba(255, 255, 255, 0.9);
	padding-bottom: 30px;
	width: 100%;
	display: flex;
	flex-direction: column;
`;

const ProfileNameInput = styled.input`
	width: 100%;
	padding: 10px 20px;
	border-radius: 20px;
	border: 1px solid black;
	text-align: center;
	background-color: white;
  	color: black;
`;

const ProfileUpdateBtn = styled.input`
	cursor: pointer;
	width: 100%;
	padding: 7px 20px;
	text-align: center;
	color: white;
	border-radius: 20px;
	background-color: #04aaff;
	margin-top: 10px;
`;

const LogOutBtn = styled.span`
	cursor: pointer;
	width: 100%;
	padding: 7px 20px;
	text-align: center;
	color: white;
	border-radius: 20px;
  	background-color: tomato;
	margin-top: 50px;
`;

const Profile = ({ userObj, refreshUser }) => {
	const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
	const history = useHistory();
	const onLogOutClick = () => {
		authService.signOut();
		history.push("/");
	};
	const getMyTweets = async() => {
		const q = query(collection(dbService, "tweets"), where("creatorId", "==", userObj.uid), orderBy("createdAt", "desc"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc) => {
			console.log(doc.id, "=>", doc.data());
		})
	}
	useEffect(() => {
		getMyTweets();
	});

	const onChange = (event) => {
		const { target: { value }} = event;
		setNewDisplayName(value);
	}

	const onSubmit = async(event) => {
		event.preventDefault();
		if(userObj.displayName !== newDisplayName) {
			await updateProfile(authService.currentUser, {
				displayName: newDisplayName,
			});
		}
		refreshUser();
	};

	return (
		<div className="container">
			<ProfileForm onSubmit={onSubmit}>
				<ProfileNameInput type="text" placeholder="Display Name" value={newDisplayName} onChange={onChange} autoFocus />
				<ProfileUpdateBtn type="submit" value="Update Profile" />
			</ProfileForm>
			<LogOutBtn onClick={onLogOutClick}>
        		Log Out
      		</LogOutBtn>
		</div>
	);
};
export default Profile;