import { deleteDoc, doc } from "@firebase/firestore";
import { dbService } from "fbase";
import React from "react";

const Tweet = ({ tweetObj, isOwner}) => {
	const onDeleteClick = async () => {
		const ok = window.confirm("Are you sure you want to delete this tweet?");
		if (ok) {
			const tweetTextRef = doc(dbService, "tweets", `${tweetObj.id}`);
			await deleteDoc(tweetTextRef);
		}
	}
	return (
		<div>
			<h4>{tweetObj.text}</h4>
			{isOwner && (
				<>
					<button onClick={onDeleteClick}>Delete tweet</button>
					<button>Edit tweet</button>
				</>
			)}
		</div>
	);
};

export default Tweet;