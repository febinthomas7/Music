import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
const Test = () => {
  //   const [textToCopy, setTextToCopy] = useState();
  //   const [isCopied, setCopied] = useClipboard(textToCopy, {
  //     successDuration: 1000,
  //   });

  // SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  const { listening, transcript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return console.log("not working");
  }
  console.log(transcript);

  return (
    <>
      <div className=" w-full">
        <h2>Speech to Text Converter is :{listening ? "on" : "off"}</h2>
        <br />
        <p>
          A React hook that converts speech from the microphone to text and
          makes it available to your React components.
        </p>

        <div className="h-[500px] w-full bg-slate-500 text-white">
          speech to text
          {transcript}
        </div>

        <div className="btn-style">
          <button
            onClick={SpeechRecognition.startListening}
            className="p-4 bg-green-500 mx-10"
          >
            Start Listening
          </button>
          <button
            onClick={SpeechRecognition.stopListening}
            className="p-4 bg-green-500 mx-10"
          >
            Stop Listening
          </button>
        </div>
      </div>
    </>
  );
};

export default Test;
