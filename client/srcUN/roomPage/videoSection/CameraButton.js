import React, { useState } from "react";

import CamaraButtonImg from "../../resources/Images/camera.svg";
import CamaraButtonImgOff from "../../resources/Images/cameraOff.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";

const CameraButton = () => {
  const [isLocalVideoDisabled, setIsLocalVideoDisabled] = useState(false);

  const handleCameraButtonPressed = () => {
    webRTCHandler.toggleCamera(isLocalVideoDisabled);
    setIsLocalVideoDisabled(!isLocalVideoDisabled);
  };
  return (
    <div className="video_button_container">
      <img
        src={isLocalVideoDisabled ? CamaraButtonImgOff : CamaraButtonImg}
        className="video_button_image"
        onClick={handleCameraButtonPressed}
      />
    </div>
  );
};

export default CameraButton;
