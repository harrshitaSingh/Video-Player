import React from "react";
import videojs from "video.js";

// This imports the functional component from the previous sample.
import VideoJS from "../VideosJS/VideoJS1";
// import { useState } from "react";
// let transparentColor = "";

const Display = () => {
  // let [color, setColor] = useState(transparentColor);
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4",
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on("waiting", () => {
      videojs.log("player is waiting");
    });

    player.on("dispose", () => {
      videojs.log("player will dispose");
    });
  };

  // function FilterLogic() {
  //   console.log("started");
  //   // let filterLayer = document.querySelector(".filter-layer");
  //   let allFilters = document.querySelectorAll(".filter");
  //   console.log(allFilters);
  //   allFilters.forEach((filterElem) => {
  //     filterElem.addEventListener("click", (e) => {
  //       transparentColor =
  //         getComputedStyle(filterElem).getPropertyValue("background-color");
  //         setColor(transparentColor);
  //       // filterLayer.style.backgroundColor = transparentColor;
  //     });
  //   });
  // }

  return (
    <>
      <VideoJS
        options={videoJsOptions}
        onReady={handlePlayerReady}
        
        />
   </>
  

       
// {/* 
//       <div className="filter-cont">
//         <div className="filter orange"></div>
//         <div className="filter brown"></div>
//         <div className="filter pink"></div>
//         <div className="filter transparent"></div>
//       </div>
//       <div className="filter-layer"></div> */}
  );
};

export default Display;
