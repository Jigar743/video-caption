import { useRef, useState } from "react";
// import VideoPlayer from "./components/VideoPlayer";
// import CaptionDisplay from "./components/CaptionDisplay";
import "./App.css";
import { convertIntoSeconds, makeTimeArray } from "./utils/helper";
import ReactPlayer from "react-player";
import TimingSelection from "./components/TimingSelection";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoCaption, setVideoCaption] = useState("");
  const [duration, setDuration] = useState({
    hours: [],
    minutes: [],
    seconds: [],
  });
  const [captionTimeStamp, setCaptionTimeStamp] = useState({
    hour: 0,
    minute: 0,
    second: 0,
  });
  const [captionInSeconds, setCaptionInSeconds] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const playerRef = useRef(null);

  const handleVideoUrlChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleVideoCaptionChange = (e) => {
    setVideoCaption(e.target.value);
  };

  const handleCaptionTimeStampChange = (e) => {
    const { name, value } = e.target;
    setCaptionTimeStamp({ ...captionTimeStamp, [name]: value });
  };

  const generateVideoCaption = () => {
    const seconds = convertIntoSeconds(captionTimeStamp);
    setCaptionInSeconds(seconds);

    setCaptionTimeStamp({
      hour: 0,
      minute: 0,
      second: 0,
    });
    setVideoCaption("");
  };

  const handleVideoDuration = (videoDuration) => {
    const hours = Math.floor(videoDuration / 3600);
    const minutes = Math.floor((videoDuration % 3600) / 60);
    const seconds = Math.floor(videoDuration % 60);

    setDuration({
      hours: makeTimeArray(hours),
      minutes: makeTimeArray(minutes),
      seconds: makeTimeArray(seconds),
    });
  };

  const handleVideoProgress = ({ playedSeconds }) => {
    const currentCaption =
      playedSeconds >= captionInSeconds && playedSeconds < captionInSeconds + 3;

    if (currentCaption) {
      document.getElementById("caption-display").innerText = videoCaption;
    } else {
      document.getElementById("caption-display").innerText = "";
    }
  };

  const loadVideoFromURl = () => {
    setShowVideo(true);
  };

  return (
    <div className="main_container">
      <div className="video_caption_app">
        <div className="video_url_input_box">
          <label htmlFor="video_url">Enter video url: </label>
          <input
            id="video_url"
            type="text"
            value={videoUrl}
            onChange={handleVideoUrlChange}
          />
          <button type="button" onClick={loadVideoFromURl}>
            Load
          </button>
        </div>
        <div className="video_player_container">
          {showVideo && videoUrl && (
            <div className="video_container">
              <ReactPlayer
                ref={playerRef}
                url={videoUrl}
                onDuration={handleVideoDuration}
                onProgress={handleVideoProgress}
                width={"100%"}
              />
              <div id="caption-display" className="caption-display"></div>
            </div>
          )}
        </div>
      </div>
      <div className="video_caption_container">
        <div className="video_caption_input_container">
          <label htmlFor="video_caption">Enter video caption: </label>
          <textarea
            id="video_caption"
            type="text"
            value={videoCaption}
            onChange={handleVideoCaptionChange}
            rows={3}
          />
        </div>
        <div className="video_caption_timestamp_container">
          <label>Caption Timestamp: </label>
          <TimingSelection
            className="timestamp_hour"
            name="hour"
            value={captionTimeStamp.hour}
            onSelectionChange={handleCaptionTimeStampChange}
            timing={duration?.hours}
          />
          <TimingSelection
            className="timestamp_minute"
            name="minute"
            value={captionTimeStamp.minute}
            onSelectionChange={handleCaptionTimeStampChange}
            timing={duration?.minutes}
          />
          <TimingSelection
            className="timestamp_second"
            name="second"
            value={captionTimeStamp.second}
            onSelectionChange={handleCaptionTimeStampChange}
            timing={duration?.seconds}
          />
          <button type="button" onClick={generateVideoCaption}>
            Add Caption
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
