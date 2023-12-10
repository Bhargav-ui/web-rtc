import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InterductionPage from "./interductionPage/InterductionPage";
import JoinRoomPage from "./joinRoomPage/JoinRoomPage";
import RoomPage from "./roomPage/RoomPage";

function App() {
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
