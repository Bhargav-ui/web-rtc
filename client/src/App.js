import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IntroductionPage from "./IntroductionPage/IntroductionPage";

import JoinRoomPage from "./JoinRoomPage/JoinRoomPage";
import RoomPage from "./RoomPage/RoomPage";
import { connectWithSocketIOServer } from "./utils/wss";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    console.log("call server");

    connectWithSocketIOServer();
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/join-room" element={<JoinRoomPage />} />
          <Route path="/room" element={<RoomPage />} />
          <Route path="/" element={<IntroductionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
