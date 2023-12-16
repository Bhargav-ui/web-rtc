import React, { useState } from "react";
import JoinRoomInputs from "./JoinRoomInputs";
import { connect, useDispatch, useSelector } from "react-redux";
import {
  setConnectOnlyWithAudio,
  setIdentity,
  setIsRoomHost,
} from "../store/action";
import OnlyWithAudioCheckbox from "./OnlyWithAudioCheckbox";
import ErrorMessage from "./ErrorMessage";
import JoinRoomButtons from "./JoinRoomButtons";
import { useNavigate } from "react-router-dom";
import { getRoomExists } from "../utils/api";

const JoinRoomContent = (props) => {
  // const { isRoomHost, setConnectOnlyWithAudio, connectOnlyWithAudio } = props;
  const isRoomHost = useSelector((state) => state.reducer.isRoomHost);
  const [roomIdValue, setRoomIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleJoinRoom = async () => {
    //joining the room
    dispatch(setIdentity(nameValue));
    console.log("joining");
    if (isRoomHost) {
      createRoom();
    } else {
      await joinRoom();
    }
  };

  const joinRoom = async () => {
    let responseMessage;
    try {
      responseMessage = await getRoomExists(roomIdValue);
      const { roomExists, full } = responseMessage;
      if (roomExists) {
        if (full) {
          setErrorMessage(`The room ${roomIdValue} is already fully booked.`);
        } else {
          // window.location.href = `http://localhost:3001/chat?id=${roomIdValue}&name=${nameValue}`;
          dispatch(setRoomIdValue(roomIdValue));
          navigate("/room");
        }
      } else {
        setErrorMessage(`The room "${roomIdValue}" does not exist.`);
      }
    } catch (error) {
      setErrorMessage("not found");
    }
  };

  const createRoom = () => {
    navigate("/room");
  };

  return (
    <>
      <JoinRoomInputs
        roomIdValue={roomIdValue}
        setRoomIdValue={setRoomIdValue}
        nameValue={nameValue}
        setNameValue={setNameValue}
        isRoomHost={isRoomHost}
      />
      <OnlyWithAudioCheckbox
      // setConnectOnlyWithAudio={setConnectOnlyWithAudio}
      // connectOnlyWithAudio={connectOnlyWithAudio}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <JoinRoomButtons
        handleJoinRoom={handleJoinRoom}
        isRoomHost={isRoomHost}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setConnectOnlyWithAudio: (onlyWithAudio) =>
      dispatch(setConnectOnlyWithAudio(onlyWithAudio)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(JoinRoomContent);

export default JoinRoomContent;
