import { updateProfile } from "@firebase/auth";
import { collection, getDocs, orderBy, query, where } from "@firebase/firestore";
import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Profile = ({ userObj }) => {
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
	}, []);

	const onChange = (event) => {
		const { target: { value }} = event;
		setNewDisplayName(value);
	}

	const onSubmit = async(event) => {
		event.preventDefault();
		if(userObj.displayName !== newDisplayName) {
			await updateProfile(userObj, {
				displayName: newDisplayName,
			});
		}
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input type="text" placeholder="Display Name" value={newDisplayName} onChange={onChange} />
				<input type="submit" value="Update Profile" />
			</form>
			<button onClick={onLogOutClick}>Log Out</button>
		</>
	);
};
export default Profile;