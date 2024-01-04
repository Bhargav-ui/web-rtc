import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterductionPage from "./interductionPage/InterductionPage";
import JoinRoomPage from "./joinRoomPage/JoinRoomPage";
import RoomPage from "./roomPage/RoomPage";
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
          <Route path="/" element={<InterductionPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
