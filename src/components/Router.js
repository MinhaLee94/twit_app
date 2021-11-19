import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";
import styled from "styled-components";

const IfLoggedIn = styled.div`
	max-width: 890px;
	width: 100%;
	margin: 0 auto;
	margin-top: 80px;
	display: flex;
	justify-content: center;
`;

const AppRouter = ({ isLoggedIn, userObj, refreshUser }) => {
	return (
		<Router>
			{isLoggedIn && <Navigation userObj={userObj} />}
			<Switch>
				{isLoggedIn ? (
					<IfLoggedIn>
						<Route exact path="/">
							<Home userObj={userObj} />
						</Route>
						<Route exact path="/profile">
							<Profile userObj={userObj} refreshUser={refreshUser} />
						</Route>
					</IfLoggedIn>
				) : (
					<>
						<Route exact path="/">
							<Auth />
						</Route>
					</>
				)}
			</Switch>
		</Router>
	)
}

export default AppRouter;
