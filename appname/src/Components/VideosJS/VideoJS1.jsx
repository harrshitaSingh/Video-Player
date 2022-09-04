import React from "react";
import { useState } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

 import Konva from "konva";
import { Stage, Layer, Circle, Image } from "react-konva";
import { Canvas } from "konva/lib/Canvas";
// import { Container } from "konva/lib/Container";

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const canvaRef = React.useRef(null);
  const { options, onReady } = props;
  const [name, setName] = useState("");
  const [items, setItems] = useState([]);
  const [numericValue, setNumericvalue] = useState(0);
  const edit = ["blur", "brightness", "opacity", "contrast", "grayscale"];
  const [active, setActive] = useState(false);

  let colorSet = "";

  if (name === "blur") {
    colorSet = "blur(" + numericValue + "px)";
  } else if (name === "brightness") {
    colorSet = " brightness(" + numericValue + "%)";
  } else if (name === "opacity") {
    colorSet = "opacity(" + numericValue + "%)";
  } else if (name === "contrast") {
    colorSet = " contrast(" + numericValue + "%)";
  } else if (name === "grayscale") {
    colorSet = " grayscale(" + numericValue + "%)";
  }

  const applyFilter = {
    filter: colorSet,
  };

  function generateItems() {
    const video = videoRef.current;

    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push({
        x: Math.random() * video.videoWidth,
        y: Math.random() * video.videoHeight,
        id: "node-" + i,
        color: Konva.Util.getRandomColor(),
      });
      setItems(items);
    }
  }

  React.useEffect(() => {
    const video = videoRef.current;
    console.log(video);
    video.height = 100;
    video.width = 200;
    const canva = canvaRef.current;
    const ctc = canva.getContext("2d");

    ctc.drawImage(video, 0, 0, Canvas.width, Canvas.height);

    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log("player is ready");
        onReady && onReady(player);
      }));
    } else {
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [onReady, options, videoRef, items]);

  return (
    <>
      <canvas ref={canvaRef}></canvas>

      <div style={{ position: "relative" }}  data-vjs-player>
        <video ref={videoRef} className="video-js vjs-big-play-centered" />
        <Stage
          style={{ position: "absolute", top: 0, left: 0 }}
          width={window.innerWidth}
          height={window.innerHeight}
        >
          <Layer>
            {items
              ? items.map((item) => (
                  <Circle
                    key={item.id}
                    name={item.id}
                    draggable
                    x={item.x}
                    y={item.y}
                    fill={item.color}
                    radius={50}
                  ></Circle>
                ))
              : null}
          </Layer>
        </Stage>
      </div>
      {/* <input ref={inputRef} className="inputBtn" /> */}
      {edit.map((value) => (
        <>
          <button onClick={() => setName(value)} key={Math.random(6)}>
            {value}
          </button>
        </>
      ))}

      {name ? (
        <input
          type="range"
          className="form-range"
          min="0"
          max="200"
          id="customRange2"
          onChange={(e) => setNumericvalue(e.target.value)}
        />
      ) : (
        <h5>Hello </h5>
      )}

      <button onClick={() => generateItems()}>Add stickers</button>
    </>
  );
};

export default VideoJS;
