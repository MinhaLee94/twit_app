import { addDoc, collection, serverTimestamp, query, onSnapshot, orderBy } from "firebase/firestore";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Tweet from "components/Tweet";

const Home = ({ userObj }) => {
	const [tweet, setTweet] = useState("");
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

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await addDoc(collection(dbService, "tweets"), {
				text: tweet,
				createdAt: serverTimestamp(),
				creatorId: userObj.uid,
			});
		} catch(error) {
			console.log(error);
		}
		setTweet("");
	};
	const onChange = (event) => {
		const { target: { value }} = event;
		setTweet(value);
	}
	return (
		<>
			<form onSubmit={onSubmit}>
				<input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
				<input type="submit" value="tweet" />
			</form>
			<div>
				{tweets.map((tweet) => 
					<Tweet key={tweet.id} tweetObj={tweet} isOwner={tweet.creatorId === userObj.uid} />
				)}
			</div>
		</>
	)
}
export default Home;