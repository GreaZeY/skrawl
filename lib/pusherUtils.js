import axios from "axios";


export const sendRequestToPusher = (channel, data) => {
  try {
    axios.post(`/api/${channel}`, data);
  } catch (err) {
    console.log(err);
  }
};
