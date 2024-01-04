import React from "react";
import "../RoomPage.css";
import { useSelector } from "react-redux";
const dummyParticipants = [
  {
    identity: "Jake",
  },
  {
    identity: "Anna",
  },
  {
    identity: "Marek",
  },
  {
    identity: "Darius",
  },
];

const SingleParticipant = (props) => {
  const { identity, lastItem } = props;

  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = () => {
  const participants = useSelector((state) => state.reducer.participants);

  return (
    <div className="participants_container">
      {participants.map((participant, index) => (
        <SingleParticipant
          key={index}
          lastItem={participants.length === index + 1}
          participant={participant}
          identity={participant.identity}
        />
      ))}
    </div>
  );
};

export default Participants;
