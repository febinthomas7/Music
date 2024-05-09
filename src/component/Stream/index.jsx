import React from "react";
import {
  Call,
  ParticipantView,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  // User,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
const apiKey = "mmhfdzb5evj2";
const userId = "Zuckuss";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiWnVja3VzcyIsImlzcyI6Imh0dHBzOi8vcHJvbnRvLmdldHN0cmVhbS5pbyIsInN1YiI6InVzZXIvWnVja3VzcyIsImlhdCI6MTcxNTI0MDM3NCwiZXhwIjoxNzE1ODQ1MTc5fQ.wA4mqB3KaY3_336MVn2OC7hD1AX8T-upvWahb99bE70";
const callId = "DVT4au3cg6wi";

// const user = {
//   User: {
//     id: "jack-guest",
//     type: "guest",
//   },
// };
// const user: User = { id: "jack-guest" };
// const user: User = {
//   id: "jack-guest",
//   type: "guest",
// };

const client = new StreamVideoClient({ apiKey, token });
const call = client.call("livestream", callId);
call.join({ create: true });
const Stream = () => {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyVideoUI />
      </StreamCall>
    </StreamVideo>
  );
};

export default Stream;

export const MyVideoUI = () => {
  const call = useCall();
  const { useIsCallLive, useLocalParticipant, useParticipantCount } =
    useCallStateHooks();

  const localParticipant = useLocalParticipant();
  const IsCallLive = useIsCallLive();
  const TotalLocalParticipant = useParticipantCount();

  return (
    <div className="w-full">
      <div>Live:{TotalLocalParticipant}</div>
      <div>
        {localParticipant && (
          <ParticipantView
            participant={localParticipant}
            ParticipantViewUI={null}
          />
        )}
      </div>
      <div>
        {IsCallLive ? (
          <button onClick={() => call?.stopLive()}>stop live</button>
        ) : (
          <button onClick={() => call?.goLive()}>start live</button>
        )}
      </div>
    </div>
  );
};
