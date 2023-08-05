import { useEffect } from "react";
import { pusherClient } from "../common/Pusher";

const usePusherEvent = (channelName, event, handler) => {

  useEffect(() => {
    const channel = pusherClient.subscribe(channelName);
    channel.bind(event, handler);


    return () => {
      pusherClient.unsubscribe(channelName);
    };
  }, []);

};

export default usePusherEvent;
