import React from "react";

const Tweet = ({ tweetObj, isOwner}) => {
	return (
		<div>
			<h4>{tweetObj.text}</h4>
			{isOwner && (
				<>
					<button>Delete tweet</button>
					<button>Edit tweet</button>
				</>
			)}
		</div>
	);
};

export default Tweet;