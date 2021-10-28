import React, { useState } from "react";

const Home = () => {
	const [tweet, setTweet] = useState("");
	const onSubmit = (event) => {
		event.preventDefault();
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
		</>
	)
}
export default Home;