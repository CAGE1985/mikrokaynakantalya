"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { Content } from "@/content/types";

export function VideoCard({
  name,
  title,
  ui,
  duration,
}: {
  name: "planlama" | "deneyim";
  title: string;
  ui: Content["ui"];
  duration: string;
}) {
  const [playing, setPlaying] = useState(false);
  const player = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (playing) player.current?.focus();
  }, [playing]);
  const play = () => {
    setPlaying(true);
    void player.current?.play().catch(() => {
      /* Native controls remain available if playback is interrupted. */
    });
  };
  return (
    <div className={`video-card ${playing ? "playing" : ""}`}>
      <video
        ref={player}
        src={`/media/videos/${name}.mp4`}
        controls={playing}
        tabIndex={playing ? 0 : -1}
        playsInline
        preload="none"
        aria-label={title}
      >
        <a href={`/media/videos/${name}.mp4`}>{ui.videoUnsupported}</a>
      </video>
      {!playing && (
        <button
          className="video-poster"
          onClick={play}
          aria-label={`${ui.play} · ${title}`}
        >
          <Image
            src={`/media/posters/${name}.jpg`}
            alt={title}
            width={720}
            height={1280}
            sizes="(max-width: 700px) 90vw, 35vw"
          />
          <span className="video-shade" />
          <span className="video-duration">{duration}</span>
          <span className="play-button">
            <Play size={26} fill="currentColor" />
          </span>
          <span className="video-bottom">
            <span>{ui.videoLanguage}</span>
            <b>{title}</b>
          </span>
        </button>
      )}
    </div>
  );
}
