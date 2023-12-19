import React from "react";
import MicButton from "./MicButton";
import CamerButton from "./CamerButton";
import SwitchToScreenSharingButton from "./SwitchToScreenSharingButton";
import LeaveRoomButton from "./LeaveRoomButton";

const VideoButtons = () => {
  return (
    <div className="video_buttons_container">
      <MicButton />
      <CamerButton />
      <LeaveRoomButton />
      <SwitchToScreenSharingButton />
    </div>
  );
};

export default VideoButtons;
