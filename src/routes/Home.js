import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";
import TweetForm from "components/TweetForm";

const Home = ({ userObj }) => {
	const [tweets, setTweets] = useState([]);
	useEffect(() => {
		const q = query(collection(dbService, "tweets"), orderBy("createdAt", "desc"));
		// when any changes on DB
		onSnapshot(q, (snapshot) => {
			const tweetArray = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setTweets(tweetArray);
		});
	}, [])
	return (
		<>
			<TweetForm userObj={userObj} />
			<div>
				{tweets.map((tweet) => 
					<Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
				)}
			</div>
		</>
	)
}
export default Home;