import axios from "axios";

const serverApi = "http://localhost:5002/api";

export const getRoomExists = async (roomId) => {
  try {
    const response = await axios.get(`${serverApi}/room-exists/${roomId}`);
    console.log("res", response);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const getTURNCredentials = async () => {
  const response = await axios.get(`${serverApi}/get-turn-credentials`);
  return response.data;
};
