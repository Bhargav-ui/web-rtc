import React from "react";
import MicButton from "./MicButton";
import CameraButton from "./CameraButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import LeaveRoomButton from "./LeaveRoomButton";
import { useSelector } from "react-redux";

const VideoButtons = () => {
  const connectOnlyWithAudio = useSelector(
    (state) => state.reducer.connectOnlyWithAudio
  );
  return (
    <div className="video_buttons_container">
      <MicButton />
      {!connectOnlyWithAudio && <CameraButton />}
      <LeaveRoomButton />
      {!connectOnlyWithAudio && <SwitchToScreenSharingButton />}
    </div>
  );
};

export default VideoButtons;
