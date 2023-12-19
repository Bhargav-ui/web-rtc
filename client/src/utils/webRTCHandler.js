import { setShowOverlay } from "../store/action";
import store from "../store/store";

const defaultConstraints = {
  audio: true,
  video: true,
};

let localStream;

export const getLocalPreviewAndInitRoomConnection = async (
  setIsRoomHost,
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

      // isRoom
      //   ? WebAssembly.createNewRoom(identity)
      //   : WebAssembly.joinRoom(roomId, identity);
    })
    .catch((error) => {
      console.log("error occured when trying to get an access to local stream");
      console.log(error);
    });
};

const showLocalVideoPreview = (stream) => {
  //
};
