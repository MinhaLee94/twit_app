import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { deleteObject, ref } from "@firebase/storage";
import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TweetList = styled.div`
	margin-bottom: 20px;
	background-color: white;
	width: 100%;
	max-width: 320px;
	padding: 20px;
	border-radius: 10px;
	position: relative;
	display: flex;
	flex-direction: column;
	color: rgba(0, 0, 0, 0.8);

	& > h4 {
		font-size: 14px;
	}

	& > img {
		right: -10px;
		top: 20px;
		position: absolute;
		border-radius: 50%;
		width: 50px;
		height: 50px;
		margin-top: 10px;
	}
`;

const TweetIcons = styled.div`
	position: absolute;
	right: 10px;
	top: 10px;

	& > span {
		cursor: pointer;
	}

	& > span::first-child {
		margin-right: 10px;
	}
`;

const TweetForm = styled.form`
	width: 100%;
	max-width: 320px;
	display: flex;
	flex-direction: column;
`;

const TweetInput = styled.input`
	width: 100%;
	padding: 10px 20px;
	border-radius: 20px;
	border: 1px solid black;
	text-align: center;
	background-color: white;
	color: black;
`;

const TweetSubmitBtn = styled.input`
	cursor: pointer;
	width: 100%;
	padding: 7px 20px;
	text-align: center;
	color: white;
	border-radius: 20px;
	background-color: #04aaff;
	cursor: pointer;
`;

const cancelBtn = styled(TweetSubmitBtn)`
	cursor: pointer;
	background-color: tomato;
`;

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
		<TweetList>
			{editing ? (
				<>
					<TweetForm onSubmit={onSubmit}>
						<TweetInput type="text" placeholder="Edit your tweet" value={newTweet} required onChange={onChange} autoFocus />
						<TweetSubmitBtn type="submit" value="Update" />
					</TweetForm>
					<cancelBtn onClick={toggleEditing} >
						Cancel
          			</cancelBtn>
				</>
			) : (
				<>
					<h4>{tweetObj.text}</h4>
					{tweetObj.attachedFileUrl && <img src={tweetObj.attachedFileUrl} alt=""/>}
					{isOwner && (
						<TweetIcons>
							<span onClick={onDeleteClick}>
								<FontAwesomeIcon icon={faTrash} />
							</span>
							<span onClick={toggleEditing}>
								<FontAwesomeIcon icon={faPencilAlt} />
							</span>
						</TweetIcons>
					)}
				</>
			)}
		</TweetList>
	);
};

export default Tweet;