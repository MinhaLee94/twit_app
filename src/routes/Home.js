import { addDoc, collection, serverTimestamp, getDocs, query } from "firebase/firestore";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = () => {
	const [tweet, setTweet] = useState("");
	const [tweets, setTweets] = useState([]);
	const getTweets = async () => {
		const q = query(collection(dbService, "tweets")); // get query
		const querySnapshot = await getDocs(q); // get collection
		querySnapshot.forEach((doc) => {
			const tweetObj = { // creating tweet obj
				...doc.data(),
				id: doc.id
			}
			setTweets(prev => [tweetObj, ...prev]); // concatenating tweets
		})
	}
	useEffect(() => {
		getTweets();
	}, [])
	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			await addDoc(collection(dbService, "tweets"), {
				tweet,
				createdAt: serverTimestamp(),
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
					<div key={tweet.id}>
						<h4>{tweet.tweet}</h4>
					</div>
				)}
			</div>
		</>
	)
}
export default Home;