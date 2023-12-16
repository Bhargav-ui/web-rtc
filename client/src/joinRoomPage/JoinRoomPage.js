import React, { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import "./JoinRoomPage.css";
import { setIsRoomHost } from "./../store/action";
import { connect, useDispatch, useSelector } from "react-redux";
import JoinRoomTitle from "./JoinRoomTitle";
import JoinRoomContent from "./JoinRoomContent";

const JoinRoomPage = (props) => {
  // const { setIsRoomHostAction, isRoomHost } = props;
  // console.log("params 33", isRoomHost);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const host = searchParams.get("host");
  const isRoomHost = useSelector((state) => state.reducer.isRoomHost);

  console.log("params", host);

  useEffect(() => {
    const isRoomHost = host;

    if (isRoomHost) {
      console.log("params 2", isRoomHost);

      dispatch(setIsRoomHost(true));
    }
  }, []);

  return (
    <div className="join_room_page_container">
      <div className="join_room_page_panel">
        <JoinRoomTitle isRoomHost={isRoomHost} />
        <JoinRoomContent isRoomHost={isRoomHost} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

// export default connect(mapStateToProps, mapDispatchToProps)(JoinRoomPage);
export default JoinRoomPage;
