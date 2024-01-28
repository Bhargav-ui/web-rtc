import React, { useState } from "react";
import SwitchImg from "../../resources/Images/switchToScreenSharing.svg";
import LocalScreenSharingPreview from "./LocalScreenSharingPreview";
import * as webRTCHandler from "../../utils/webRTCHandler";

const constraints = {
  audio: false,
  video: true,
};
const SwitchToScreenSharingButton = () => {
  const [isScreenSharingActive, setIsScreenSharingActive] = useState(false);
  const [screenSharingStream, setScreenSharingStream] = useState(null);

  const handleScreenShareToggle = async () => {
    if (!isScreenSharingActive) {
      let stream = null;
      try {
        stream = await navigator.mediaDevices.getDisplayMedia(constraints);
      } catch (err) {
        console.log(
          "error occured when trying to get an access to screen share"
        );
      }
      if (stream) {
        setScreenSharingStream(stream);
        webRTCHandler.toggleScreenShare(isScreenSharingActive, stream);
        setIsScreenSharingActive(true);
        // execute here function to switch the video track which we are sending
      }
    } else {
      webRTCHandler.toggleScreenShare(isScreenSharingActive);

      //switch for video track from camera
      setIsScreenSharingActive(false);
      //stop screen share stream
      screenSharingStream.getTracks().forEach((t) => t.stop());
      setScreenSharingStream(null);
    }
  };

  return (
    <>
      <div className="video_button_container">
        <img
          src={SwitchImg}
          // handleSectionShareToggle
          onClick={handleScreenShareToggle}
          className="video_button_image"
        />
      </div>
      {isScreenSharingActive && (
        <LocalScreenSharingPreview stream={screenSharingStream} />
      )}
    </>
  );
};

export default SwitchToScreenSharingButton;
