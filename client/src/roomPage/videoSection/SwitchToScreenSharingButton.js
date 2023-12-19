import React, { useState } from "react";
import SwitchImg from "../../resources/Images/switchToScreenSharing.svg";

const SwitchToScreenSharingButton = () => {
  const [isScreenShareingActive, setIsScreenShareingActive] = useState(false);

  const handleSectionShareToggle = () => {
    setIsScreenShareingActive(!isScreenShareingActive);
  };

  return (
    <div className="video_button_container">
      <img
        src={SwitchImg}
        onClick={handleSectionShareToggle}
        className="video_button_image"
      />
    </div>
  );
};

export default SwitchToScreenSharingButton;
