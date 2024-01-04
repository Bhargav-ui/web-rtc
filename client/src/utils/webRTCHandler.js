import { Socket } from "socket.io-client";
import { setShowOverlay } from "../store/action";
import store from "../store/store";
import * as wss from "./wss";
import Peer from "simple-peer";

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  isRoomHost,
  identity,
  roomId = null
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraints)
    .then((stream) => {
      console.log("successfully received local stream");
      localStream = stream;
      showLocalVideoPreview(localStream);

      store.dispatch(setShowOverlay(false));

      isRoomHost ? wss.createNewRoom(identity) : wss.joinRoom(identity, roomId);
    })
    .catch((error) => {
      console.log("error occured when trying to get an access to local stream");
      console.log(error);
    });
};

const showLocalVideoPreview = (stream) => {
  //
};

let peers = {};
let streams = [];
const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };
};
export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  // return new RTCPeerConnection({});
  const configuration = getConfiguration();

  peers[connUserSocketId] = new peers({
    isInitiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on("signal", (data) => {
    //webRTC offer, webRTC Answer (SDP informations), ice condidates
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };
    wss.signalPeerData(signalData);
  });

  peers[connUserSocketId].on("stream", (stream) => {
    console.log("new stream came");
    addStream(stream.connUserSocketId);
    streams = [...streams, stream];
  });
};

export const handleSignalingData = (data) => {
  //add signaling data to peer connection
  peers[data.connUserSocketId].signal(data.signal);
};
const addStream = (stream, connUserSocketId) => {
  //display incoming stream
};
