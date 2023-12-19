import React, { useEffect } from "react";
import ParticipantsSection from "./participantsSection/ParticipantsSection";
import VideoSection from "./videoSection/VideoSection";
import ChatSection from "./chatSection/ChatSection";

import "./RoomPage.css";
import RoomLabel from "./RoomLabel";
import { useDispatch, useSelector } from "react-redux";
import * as webRTCHandler from "../utils/webRTCHandler";
import Overlay from "./Overlay";

const RoomPage = () => {
  const dispatch = useDispatch();
  const roomId = useSelector((state) => state.reducer.roomId);
  const identity = useSelector((state) => state.reducer.identity);
  const isRoomHost = useSelector((state) => state.reducer.isRoomHost);
  const showOverlay = useSelector((state) => state.reducer.showOverlay);

  useEffect(() => {
    webRTCHandler.getLocalPreviewAndInitRoomConnection(
      isRoomHost,
      identity,
      roomId
    );
  }, []);

  console.log("showOverlay", showOverlay);
  return (
    <div className="room_container">
      <ParticipantsSection />
      <VideoSection />
      <ChatSection />
      <RoomLabel roomId={roomId} />
      {showOverlay && <Overlay />}
    </div>
  );
};

export default RoomPage;
