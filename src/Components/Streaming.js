import React from "react";

const Streaming = () => {
  useEffect(() => {
    const video = document.getElementsByTagName("video")[0];
    const chunks = 100;
    const file = "http://211.110.167.131:8000/content/streaming/82";
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
    const loadChunk = i => {
      const xhr = new XMLHttpRequest();
      const start = 0;
      const length = 30000000;

      const chunkSize = Math.ceil(length / chunks);
      xhr.open("GET", file, true);

      xhr.responseType = "arraybuffer";
      let startByte = parseInt(start + chunkSize * i);
      xhr.setRequestHeader(
        "Range",
        "bytes=" + start + chunkSize * i + "-" + (startByte + chunkSize - 1)
      );

      console.log(
        "bytes=" + start + chunkSize * i + "-" + (startByte + chunkSize - 1)
      );

      xhr.addEventListener("load", function (e) {
        mediaSource.sourceBuffers[0].appendBuffer(new Uint8Array(xhr.response));
      });
      xhr.send();
    };
  }, []);
  return (
    <>
      <video></video>
    </>
  );
};

export default Streaming;
