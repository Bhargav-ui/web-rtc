import React, { useEffect } from "react";
import logo from "../resources/Images/logo.png";
import ConnectingButtons from "./ConnectingButtons";
import { connect } from "react-redux";
import { setIsRoomHost } from "../store/action";
import "./IntroductionPage.css";

const IntroductionPage = ({ setIsRoomHostAction }) => {
  useEffect(() => {
    setIsRoomHostAction(false);
  }, []);

  return (
    <div className="introduction_page_container">
      <div className="introduction_page_panel">
        <img src={logo} className="introduction_page_image" />
        <ConnectingButtons />
      </div>
    </div>
  );
};

// export default InterductionPage;

// const mapStateToProps = (state) => {
//   return {
//     ...state,
//   };
// };

const mapDispatchToProps = (dispatch) => {
  return {
    setIsRoomHostAction: (isRoomHost) => dispatch(setIsRoomHost(isRoomHost)),
  };
};

export default connect(null, mapDispatchToProps)(IntroductionPage);
