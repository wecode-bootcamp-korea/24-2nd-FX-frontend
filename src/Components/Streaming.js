import { useEffect, useRef } from "react";
import styled from "styled-components";
import { STREAM_URL } from "../config.js";

const Streaming = props => {
  const videoRef = useRef();

  useEffect(() => {
    const video = videoRef.current;
    const chunks = 30;
    const streamingFile = `${STREAM_URL}${props.streamId}`;
    const mediaSource = new MediaSource();

    mediaSource.addEventListener("sourceopen", e => {
      const ms = mediaSource.addSourceBuffer(
        'video/mp4; codecs="avc1.4D4001,mp4a.40.2"'
      );
      ms.addEventListener(
        "updateend",
        () => {
          if (i === chunks - 1) {
            return;
          }
          loadChunk(++i);
        },
        false
      );
      loadChunk(0);
    });

    mediaSource.addEventListener("sourceclose", () => {
      console.log("ended");
    });

    video.src = window.URL.createObjectURL(mediaSource);

    let i = 0;

    const loadChunk = async i => {
      const start = 0;
      const length = 30000000;

      const chunkSize = Math.ceil(length / chunks);
      const startByte = parseInt(start + chunkSize * i);

      const range =
        "bytes=" + start + chunkSize * i + "-" + (startByte + chunkSize - 1);

      const res = await fetch(streamingFile, {
        headers: {
          Range: range,
        },
      }).then(res => res.arrayBuffer());

      mediaSource.sourceBuffers[0].appendBuffer(new Uint8Array(res));
    };
  }, []);

  return (
    <>
      <VideoStream ref={videoRef} autoPlay muted width="100%" controls />
    </>
  );
};

const VideoStream = styled.video`
  margin-top: -70px;
`;

export default Streaming;
