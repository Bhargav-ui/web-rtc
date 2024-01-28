import React from "react";
import CheckImg from "../resources/Images/check.png";
import { useDispatch, useSelector } from "react-redux";
import { setConnectOnlyWithAudio } from "../store/action";

const OnlyWithAudioCheckbox = (
  {
    //   setConnectOnlyWithAudio,
    //   connectOnlyWithAudio,
  }
) => {
  const dispatch = useDispatch();
  const connectOnlyWithAudio = useSelector(
    (state) => state.reducer.connectOnlyWithAudio
  );

  const handleConnectionTypeChange = () => {
    console.log("abc 1", connectOnlyWithAudio);
    //change info in our store about connection type
    // setConnectOnlyWithAudio(!connectOnlyWithAudio);
    dispatch(setConnectOnlyWithAudio(!connectOnlyWithAudio));
  };
  return (
    <div className="checkbox_container">
      <div className="checkbox_connection" onClick={handleConnectionTypeChange}>
        {connectOnlyWithAudio && (
          <img className="checkbox_image" src={CheckImg} />
        )}
      </div>
      <p className="checkbox_container_paragraph">Only audio</p>
    </div>
  );
};

export default OnlyWithAudioCheckbox;
