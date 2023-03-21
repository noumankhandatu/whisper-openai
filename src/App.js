import React, { useState } from "react";
import Navbar from "./components/navbar";
import OpenAiImage from "./assets/openAI.png";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";
import { audioCss, boxLayout } from "./components/navbar/style";
import "./App.css";

// real time speech
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// static data
const textColor = "white";
const textOne = "Whisper Demo";
const textTwo =
  " Audio transcription and translation demo based on OpenAI Whisper. Record speech from your device to transcribe and translate it (remember to press stop recording when done!).";
function App() {
  // audio rec start
  const [audioUrl, setAudioUrl] = useState(null);
  const [WhisperTranscript, setWhisperTranscript] = useState(null);

  const addAudioElement = async (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);

    const formData = new FormData();
    const fileType = "audio/mp3";
    const fileName = "audio_file.mp3";
    const file = new File([blob], fileName, { type: fileType });
    formData.append("file", file);
    formData.append("model", "whisper-1");
    formData.append("response_format", "text");

    try {
      const response = await fetch(
        "https://api.openai.com/v1/audio/transcriptions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
          },
          body: formData,
        }
      );
      const text = await response.text();
      setWhisperTranscript(text);
    } catch (error) {
      console.error(error);
    }
  };
  // audio rec end

  // real time speech start
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const StartRealTimeListening = () => {
    SpeechRecognition.startListening({ continuous: true });
  };

  // clear button
  const handleClear = () => {
    setAudioUrl(null);
    setWhisperTranscript(null);
    // real time
    SpeechRecognition.stopListening();
    resetTranscript();
  };

  return (
    <div className="App">
      <Navbar />
      <img
        style={{ position: "relative" }}
        width={"100%"}
        src={OpenAiImage}
        alt=""
      />
      <Box sx={{ pt: 4 }}>
        <Typography
          variant="h4"
          sx={{ textAlign: "center", color: textColor, pt: 1, pb: 4 }}
        >
          {textOne}
        </Typography>
        <Typography
          variant="body1"
          sx={{ textAlign: "center", color: textColor }}
        >
          {textTwo}
        </Typography>
      </Box>
      <Box sx={boxLayout}>
        <Box sx={audioCss}>
          <Box sx={{ pt: 1 }}>
            {audioUrl ? (
              <audio src={audioUrl} controls={true} />
            ) : (
              "Record a voice"
            )}
          </Box>
          <Box sx={{ pt: 1, pb: 1 }}>
            {audioUrl ? (
              <Button
                onClick={handleClear}
                variant="contained"
                color="error"
                sx={{ backgroundColor: "#3F4958", width: "400px" }}
              >
                Clear
              </Button>
            ) : (
              <div onClick={StartRealTimeListening}>
                <AudioRecorder onRecordingComplete={addAudioElement} />
              </div>
            )}
          </Box>
        </Box>
        <Box sx={audioCss}>
          {/* <div>
            <p>{!audioUrl && transcript}</p>
          </div> */}
          {audioUrl || transcript ? (
            <p>{WhisperTranscript ? WhisperTranscript : transcript}</p>
          ) : (
            `I can write your words 😊 `
          )}
        </Box>
      </Box>
    </div>
  );
}

export default App;
// const RecordAudioButton = () => {
//   const [recording, setRecording] = useState(false);

//   const handleClick = () => {
//     setRecording(!recording);
//   };

//   return (
//     <Button size="small" variant="contained" onClick={handleClick}>
//       {recording ? (
//         <div className="beeping-animation beeping"></div>
//       ) : (
//         <div className="stop-beeping-animation"></div>
//       )}
//       <p style={{ color: "transparent" }}>..</p>

//       <p style={{ marginTop: "2px" }}>
//         {recording ? "Stop Recording" : "Start Recording"}
//       </p>
//     </Button>
//   );
// };
