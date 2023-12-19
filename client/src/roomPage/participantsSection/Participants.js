import React from "react";
import "../RoomPage.css";
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
  const { identity, lastItem, participant } = props;

  return (
    <>
      <p className="participants_paragraph">{identity}</p>
      {!lastItem && <span className="participants_separator_line"></span>}
    </>
  );
};

const Participants = () => {
  return (
    <div className="participants_container">
      {dummyParticipants.map((participant, index) => (
        <>
          <SingleParticipant
            key={participant.identity}
            lastItem={dummyParticipants.length === index + 1}
            participant={participant}
            identity={participant.identity}
          ></SingleParticipant>
        </>
      ))}
    </div>
  );
};

export default Participants;
