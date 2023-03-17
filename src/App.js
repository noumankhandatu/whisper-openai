import React, { useState } from "react";
import openai from "openai";
import Navbar from "./components/navbar";
import OpenAiImage from "./assets/openAI.png";
import "./App.css";
import { Box } from "@mui/system";
import { Button, Typography } from "@mui/material";
import { AudioRecorder } from "react-audio-voice-recorder";
import { audioCss, boxLayout } from "./components/navbar/style";

// static data
const textColor = "white";
const backgroundColor = "#0B0F19";
const textOne = "Whisper Demo";
const textTwo =
  " Audio transcription and translation demo based on OpenAI Whisper. Record speech from your device to transcribe and translate it (remember to press stop recording when done!).";

function App() {
  // audio rec start
  const [audioUrl, setAudioUrl] = useState(null);

  const addAudioElement = (blob) => {
    const url = URL.createObjectURL(blob);
    setAudioUrl(url);
  };
  // audio rec end

  // clear button
  const handleClear = () => {
    setAudioUrl(null);
  };

  console.log(audioUrl, "audio url");
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
              <AudioRecorder onRecordingComplete={addAudioElement} />
            )}
          </Box>
        </Box>
        <Box sx={audioCss}>Hello there how are you</Box>
      </Box>
    </div>
  );
}

export default App;
const RecordAudioButton = () => {
  const [recording, setRecording] = useState(false);

  const handleClick = () => {
    setRecording(!recording);
  };

  return (
    <Button size="small" variant="contained" onClick={handleClick}>
      {recording ? (
        <div className="beeping-animation beeping"></div>
      ) : (
        <div className="stop-beeping-animation"></div>
      )}
      <p style={{ color: "transparent" }}>..</p>

      <p style={{ marginTop: "2px" }}>
        {recording ? "Stop Recording" : "Start Recording"}
      </p>
    </Button>
  );
};

// test this on codesandbox
//   import "./styles.css";
// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import { AudioRecorder } from "react-audio-voice-recorder";
// import { Box } from "@mui/material";

// export default function App() {
//   const [audioUrl, setAudioUrl] = useState(null);

//   const addAudioElement = (blob) => {
//     const url = URL.createObjectURL(blob);
//     console.log(url, "Hello");
//     setAudioUrl(url);

//     const requestOptions = {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer YOUR_API_KEY",
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({
//         file: "audio.mp3",
//         model: "whisper-1"
//       })
//     };

//     const z = fetch(
//       "https://api.openai.com/v1/audio/transcriptions",
//       requestOptions
//     )
//       .then((response) => response.json())
//       .then((data) => console.log(data));

//     console.log(z);
//   };

//   return (
//     <div className="App">
//       <h1>Hello CodeSandbox</h1>
//       <h2>Start editing to see some magic happen!</h2>{" "}
//       <Box sx={{ p: 2, backgroundColor: "#1F2937" }}>
//         asd
//         <AudioRecorder onRecordingComplete={addAudioElement} />
//         {audioUrl && <audio src={audioUrl} controls={true} />}
//       </Box>
//     </div>
//   );
// }
