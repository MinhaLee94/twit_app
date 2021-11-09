import React, { useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const TweetForm = ({ userObj,  }) => {
	const [tweet, setTweet] = useState("");
	const [attachedFile, setAttachedFile] = useState("");
	const onSubmit = async (event) => {
		event.preventDefault();
		let attachedFileUrl = "";
		if(attachedFile !== ""){
			const attachedFileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
			const response = await uploadString(attachedFileRef, attachedFile, "data_url");
			attachedFileUrl = await getDownloadURL(response.ref);
		}
		await addDoc(collection(dbService, "tweets"), {
			text: tweet,
			createdAt: serverTimestamp(),
			creatorId: userObj.uid,
			attachedFileUrl
		});
		setTweet("");
		setAttachedFile("");
	};
	const onChange = (event) => {
		const { target: { value }} = event;
		setTweet(value);
	}
	const onFileChange = (event) => {
		const { target:{ files }} = event;
		const file = files[0];
		const reader = new FileReader();
		reader.onloadend = (finishedEvent) => {
			const { currentTarget: { result }} = finishedEvent;
			setAttachedFile(result);
		};
		reader.readAsDataURL(file);
	}
	const onClearAttachedFile = () => setAttachedFile(null);
	return (
		<form onSubmit={onSubmit}>
			<input value={tweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
			<input type="file" accept="image/*" onChange={onFileChange} />
			<input type="submit" value="tweet" />
			{attachedFile && (
				<div>
					<img alt="" src={attachedFile} width="50px" />
					<button onClick={onClearAttachedFile}>Clear</button>
				</div>
			)}
		</form>
	)
}

export default TweetForm;