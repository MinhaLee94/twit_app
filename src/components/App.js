import React, { useState, useEffect } from "react";
import AppRouter from "components/Router";
import { authService } from "fbase";
import { updateProfile } from "@firebase/auth";

function App() {
	const [init, setInit] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		authService.onAuthStateChanged((user) => {
			if(user) {
				if(user.displayName === null) {
					user.updateProfile({
						displayName: "User",
					});
				}
				setIsLoggedIn(true);
				setUserObj(user);
			} else {
				setIsLoggedIn(false)
			}
			setInit(true);
		}); 
	}, []);
  	return (
		<>
	  		{init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} /> : "Initializing..."}
			<footer>&copy; {new Date().getFullYear()} Twit-app</footer>
		</>
	);
}

export default App;
