import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";
import GlobalStyles from "GlobalStyles";

function App() {
	const [init, setInit] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if(user) {
				if(user.displayName === null) {
					updateProfile(user, {
						displayName: "User",
					});
				}
				setUserObj({
					uid: user.uid,
					displayName: user.displayName
				});
			} else {
				setUserObj(null);
			}
			setInit(true);
		}); 
	}, []);
	const refreshUser = () => {
		const user = authService.currentUser;
		setUserObj({
			uid: user.uid,
			displayName: user.displayName
		});
	}
  	return (
		<>
			<GlobalStyles />
	  		{init ? (
			  	<AppRouter 
			  		isLoggedIn={Boolean(userObj)} 
					userObj={userObj} 
					refreshUser={refreshUser} 
				/>
			) : (
				"Initializing..."
			)}
		</>
	);
}

export default App;
