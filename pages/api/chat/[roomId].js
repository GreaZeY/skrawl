import { CHAT } from "../../../common/Constants";
import { pusherServer } from "../../../common/Pusher";

export default async function handler(req, res) {
   const { roomId } = req.query;
  //  pusherServer.trigger(roomId, CHAT, {
  //    username: "broadcast",
  //    text: `${req.body.username} Joined`,
  //  });
  pusherServer.trigger(roomId, CHAT, req.body);
  res.send({ status: 200 });
}
