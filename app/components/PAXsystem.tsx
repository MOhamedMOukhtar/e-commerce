"use client";

import { Button } from "@/components/ui/button";
import React, { useRef, useState } from "react";
import { IoMdPlay } from "react-icons/io";
import { IoMdPause } from "react-icons/io";

function PAXsystem() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [cliked, setCliked] = useState(false);
  const [showIcon, setShowIcon] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;

    setCliked(true);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setTimeout(() => {
      setCliked(false);
    }, 20);
  };

  return (
    <div className="-mt-20 mb-15 flex flex-col xl:flex-row">
      <div className="relative basis-[66%]">
        <video
          ref={videoRef}
          muted
          loop
          autoPlay
          src={
            "https://www.ikea.com/ext/ingkadam/m/692af4725ebe7539/original/PJ24_PCAC_BED_L3_PAX_Animation_Series_System_16x9_WEB.mp4"
          }
        >
          Sorry, your browser doesn’t support embedded videos.
        </video>
        <div
          className="group absolute top-0 right-0 bottom-0 left-0 cursor-pointer"
          onMouseEnter={() => setShowIcon(true)}
          onMouseLeave={() => {
            setTimeout(() => {
              setShowIcon(false);
            }, 3000);
          }}
          onClick={togglePlay}
        >
          <button
            className={`absolute right-4 bottom-4 cursor-pointer rounded-full bg-black/60 p-3 transition duration-300 ease-out hover:bg-black/65 ${!showIcon && isPlaying ? "opacity-0" : "opacity-100"}`}
          >
            {isPlaying ? (
              <IoMdPause
                color="white"
                className={`transition-transform duration-200 ${!cliked && "group-hover:scale-120"}`}
              />
            ) : (
              <IoMdPlay
                color="white"
                className={`transition-transform duration-200 ${!cliked && "group-hover:scale-120"}`}
              />
            )}
          </button>
        </div>
      </div>
      <div className="basis-[34%] bg-[#f5f5f5] p-12">
        <h2 className="mb-3 text-2xl">
          A wardrobe for all the clothes in your life
        </h2>
        <p className="text-sm font-medium text-black/50">
          Because not everyone has the same amount – or type – of clothes, shoes
          and accessories, or the same space, there are endless possible ways in
          which they can fit into a PAX wardrobe. Here are just a few.
        </p>
        <Button variant={"default"} className="mt-8 rounded-full text-xs">
          See all PAX wardrobes
        </Button>
      </div>
    </div>
  );
}

export default PAXsystem;
