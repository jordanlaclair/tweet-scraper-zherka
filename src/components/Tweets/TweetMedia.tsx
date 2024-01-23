import React from "react";
import Tweet from "../../app/_types/Tweet";
import TweetImage from "./TweetImage";
import TweetVideo from "./TweetVideo";
const TweetMedia = (props: { tweetData: Tweet }) => {
  if (props.tweetData.photos && props.tweetData.photos.length > 0) {
    return (
      <div className="m-4 flex justify-center align-middle overflow-hidden w-60 h-60 relative">
        <TweetImage
          photos={props.tweetData.photos}
          blurredPreview={props.tweetData.blurredMedia}
        />
      </div>
    );
  }

  if (props.tweetData.videos && props.tweetData.videos.length > 0) {
    return (
      <div className="m-4 flex justify-center align-middle overflow-hidden w-60 h-60 relative">
        <TweetVideo
          video={props.tweetData.videos}
          blurredPreview={props.tweetData.blurredMedia}
        />
      </div>
    );
  }

  return null;
};

export default TweetMedia;
