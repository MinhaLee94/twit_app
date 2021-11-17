import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Navbar = styled.ul`
	display: flex; 
	justify-content: center; 
	margin-top: 50px;
	list-style-type: none;
`;

const TwitIcon = styled(Link)`
	margin-right: 10px;
`;

const ProfileIcon = styled(Link)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-left: 10px;
	font-size: 12px;
	text-decoration: none;
	&:visited {
		color: #04AAFF;
	} 
`;

const Navigation = ({ userObj }) => <nav>
	<Navbar>
		<li>
			<TwitIcon to="/">
				<FontAwesomeIcon icon={faTwitter} color={"#04AAFF"} size="2x" />
			</TwitIcon>
		</li>
		<li>
		<ProfileIcon to="/profile">
          <FontAwesomeIcon icon={faUser} color={"#04AAFF"} size="2x" />
          <span style={{ marginTop: 10 }}>
            {userObj?.displayName
              ? `${userObj.displayName}` : "User"}`s Profile
          </span>
        </ProfileIcon>
		</li>
	</Navbar>
</nav>;

export default Navigation;