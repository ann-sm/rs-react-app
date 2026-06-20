'use client';

import { useEffect, useRef, useState } from 'react';

const Audio = ({ cry }: { cry: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      setIsPlaying(false);
    }
  }, [cry]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
  };

  return (
    <div className="mr-2">
      <audio
        ref={audioRef}
        src={cry}
        onEnded={handleAudioEnd}
        aria-label="cry-audio"
      />
      <button
        onClick={togglePlayPause}
        className="w-10 h-10 rounded-full bg-yellow-500 hover:bg-yellow-400 hover:cursor-pointer transition-colors flex items-center justify-center"
      >
        <svg
          className="w-5 h-5 text-teal-600 audio-play"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-label="audio-play"
        >
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      </button>
    </div>
  );
}

export default Audio;
