import React from "react";
import { useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
const APPID = import.meta.env.VITE_CLIENT_APP_ID;
const SECRETID = import.meta.env.VITE_CLIENT_SERVER_SECRET;

const Stream = ({ id, role }) => {
  const { roomId } = useParams();

  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }
  const appID = +APPID;
  const serverSecret = SECRETID;
  const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
    appID,
    serverSecret,
    roomId,
    randomID(5),
    randomID(5)
  );

  let myMeeting = async (element) => {
    // Create instance object from Kit Token.
    const zp = ZegoUIKitPrebuilt.create(kitToken);
    // start the call
    zp.joinRoom({
      container: element,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: role,
        },
      },
    });
  };
  return (
    <div
      className="myCallContainer bg-black w-full h-svh flex justify-center items-center"
      ref={myMeeting}
    ></div>
  );
};

export default Stream;
