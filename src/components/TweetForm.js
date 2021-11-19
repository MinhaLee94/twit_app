import React, { useState } from "react";
import { storageService, dbService } from "fbase";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const TweetInputForm = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
`;

const TweetInputContainer = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	position: relative;
	margin-bottom: 20px;
	width: 100%;
`;

const TweetInput = styled.input`
	flex-grow: 1;
	height: 40px;
	padding: 0px 20px;
	color: white;
	border: 1px solid #04aaff;
	border-radius: 20px;
	font-weight: 500;
	font-size: 12px;
`;

const TweetInputArrow = styled.input`
	position: absolute;
	right: 0;
	background-color: #04aaff;
	height: 40px;
	width: 40px;
	padding: 10px 0px;
	text-align: center;
	border-radius: 20px;
	color: white;
`;

const TweetInputLabel = styled.label`
	color: #04aaff;
  	cursor: pointer;
`;

const TweetAttachment = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	& > img {
		height: 80px;
		width: 80px;
		border-radius: 40px;
	}
`;

const AttachmentRemoveBtn = styled.div`
	color: #04aaff;
	cursor: pointer;
	text-align: center;
	& > span {
		margin-right: 10px;
  		font-size: 12px;
	}
`;

const TweetForm = ({ userObj,  }) => {
	const [tweet, setTweet] = useState("");
	const [attachedFile, setAttachedFile] = useState("");
	const onSubmit = async (event) => {
		if (tweet === "") {
			return;
		}
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
	const onClearAttachedFile = () => setAttachedFile("");
	return (
		<TweetInputForm onSubmit={onSubmit}>
			<TweetInputContainer>
				<TweetInput
					value={tweet}
					onChange={onChange}
					type="text"
					placeholder="What's on your mind?"
					maxLength={120}
				/>
        		<TweetInputArrow type="submit" value="&rarr;" />
     		</TweetInputContainer> 
      		<TweetInputLabel htmlFor="attach-file">
        		<span>Add photos</span>
        		<FontAwesomeIcon icon={faPlus} />
      		</TweetInputLabel>
			<input
				id="attach-file"
				type="file"
				accept="image/*"
				onChange={onFileChange}
				style={{
				opacity: 0,
				}}
			/>
			{attachedFile && (
				<TweetAttachment>
					<img
						alt=""
						src={attachedFile}
						style={{
							backgroundImage: attachedFile,
						}}
					/>
					<AttachmentRemoveBtn onClick={onClearAttachedFile}>
						<span>Remove</span>
						<FontAwesomeIcon icon={faTimes} />
					</AttachmentRemoveBtn>
				</TweetAttachment>
			)}
		</TweetInputForm>
	)
}

export default TweetForm;