import React, { useState } from "react";
import SendMessageButton from "../../resources/Images/sendMessageButton.svg";
import * as webRTCHandler from "../../utils/webRTCHandler";

const NewMessage = () => {
  const [message, setMessage] = useState("");

  const handleTextChange = (event) => {
    setMessage(event.target.value);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      //send message to other users
      sendMessage();
    }
  };

  const sendMessage = (event) => {
    if (message.length > 0) {
      webRTCHandler.sendMessageUsingDataChannel(message);
      console.log("sending message to other users");
      console.log(message);
      //execute a function to sent a message

      setMessage("");
    }
  };

  return (
    <div className="new_message_container">
      <input
        className="new_message_input"
        value={message}
        onChange={handleTextChange}
        placeholder="Type your message..."
        type="text"
        onKeyDown={handleKeyPressed}
      />
      <img
        className="new_message_button"
        src={SendMessageButton}
        alt="send"
        onClick={sendMessage}
      />
    </div>
  );
};

export default NewMessage;
