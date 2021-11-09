import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";

const Tweet = ({ tweetObj, isOwner}) => {
	const [editing, setEditing] = useState(false);
	const [newTweet, setNewTweet] = useState(tweetObj.text);
	const onDeleteClick = async () => {
		const ok = window.confirm("Are you sure you want to delete this tweet?");
		if (ok) {
			const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
			const tweetImageRef = ref(storageService, tweetObj.attachedFileUrl);
			await deleteDoc(tweetTextRef);
			await deleteObject(tweetImageRef);
		}
	}
	const toggleEditing = () => {
		setEditing(prev => !prev);
	}
	const onSubmit = async (event) => {
		event.preventDefault();
		const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
		await updateDoc(tweetTextRef, {
			text: newTweet,
		});
		setEditing(false);
	}
	const onChange = (event) => {
		const { target: { value }} = event;
		setNewTweet(value);
	}
	return (
		<div>
			{editing ? (
				<>
					<form onSubmit={onSubmit}>
						<input type="text" placeholder="Edit your tweet" value={newTweet} required onChange={onChange} />
						<input type="submit" value="Update" />
					</form>
					<button onClick={toggleEditing}>Cancel</button>
				</>
			) : (
				<>
					<h4>{tweetObj.text}</h4>
					{tweetObj.attachedFileUrl && <img src={tweetObj.attachedFileUrl} alt="" width="50px" height="50px" />}
					{isOwner && (
						<>
							<button onClick={onDeleteClick}>Delete tweet</button>
							<button onClick={toggleEditing}>Edit tweet</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Tweet;