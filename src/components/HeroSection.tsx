import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles, MapPin, Sliders, Film, Maximize } from 'lucide-react';
import { motion } from 'motion/react';
import logoImg from '../assets/images/mujtaba_gold_logo_1786177848393.jpg';
import videoHeroPosterDefault from '../assets/images/mujtaba_video_hero_1786177863771.jpg';
import { VideoSettings } from '../types';

interface HeroSectionProps {
  onExploreClick: (category?: string) => void;
  onOpenLocation: () => void;
  videoSettings?: VideoSettings | null;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onOpenLocation, videoSettings }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [overlayOpacity, setOverlayOpacity] = useState(0.35);
  const videoRef = useRef<HTMLVideoElement>(null);

  const heroVideoSrc = videoSettings?.heroVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-fashion-model-in-a-white-dress-walking-41443-large.mp4";
  const heroPoster = videoSettings?.heroPosterUrl || videoHeroPosterDefault;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
      setIsPlaying(true);
    }
  }, [heroVideoSrc]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current && videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section className="relative w-full h-[90vh] min-h-[620px] max-h-[960px] overflow-hidden bg-slate-950 text-white flex items-center justify-center">
      {/* Background Video Loop with High Res Image Fallback */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted={isMuted}
        playsInline
        preload="metadata"
        poster={heroPoster}
        className="absolute inset-0 w-full h-full object-cover object-center scale-105 filter brightness-100 transition-all"
      >
        <source
          src={heroVideoSrc}
          type="video/mp4"
        />
        {/* Fallback image */}
        <img
          src={heroPoster}
          alt="Mujtaba Designer Video Hero Background"
          loading="lazy"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </video>

      {/* Dynamic Dark Overlay for Superior Legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-slate-950/30 transition-opacity duration-300"
        style={{ opacity: overlayOpacity }}
      />

      {/* Frosted Glass Video Controls Overlay Bar */}
      <div className="absolute top-6 right-6 z-20 flex items-center gap-3 bg-slate-950/80 backdrop-blur-md px-5 py-2.5 rounded-full border border-amber-400/30 text-xs sm:text-sm text-white shadow-2xl">
        <button
          onClick={togglePlay}
          className="hover:text-amber-300 transition-colors p-1 cursor-pointer"
          title={isPlaying ? 'Pause Background Video' : 'Play Video'}
        >
          {isPlaying ? <Pause className="w-4 h-4 text-amber-300" /> : <Play className="w-4 h-4 text-amber-300" />}
        </button>
        <div className="w-[1px] h-4 bg-white/30" />
        <button
          onClick={toggleMute}
          className="hover:text-amber-300 transition-colors p-1 cursor-pointer"
          title={isMuted ? 'Unmute Audio' : 'Mute Video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
        <div className="w-[1px] h-4 bg-white/30" />
        <button
          onClick={toggleFullscreen}
          className="hover:text-amber-300 transition-colors p-1 cursor-pointer"
          title="Fullscreen Video"
        >
          <Maximize className="w-4 h-4" />
        </button>
        <div className="hidden sm:block w-[1px] h-4 bg-white/30" />
        <div className="hidden sm:flex items-center gap-2 px-1">
          <Sliders className="w-3.5 h-3.5 text-amber-300" />
          <input
            type="range"
            min="0.1"
            max="0.8"
            step="0.05"
            value={overlayOpacity}
            onChange={(e) => setOverlayOpacity(parseFloat(e.target.value))}
            className="w-16 h-1.5 bg-white/40 rounded-lg appearance-none cursor-pointer accent-amber-300"
            title="Adjust Overlay Darkening"
          />
        </div>
      </div>

      {/* Currently Viewing Frosted Badge (Bottom Right) */}
      <div className="hidden sm:flex absolute bottom-10 right-10 z-20 bg-slate-950/85 backdrop-blur-xl p-4 px-6 border border-amber-400/40 shadow-2xl flex-col gap-1 rounded-2xl text-white max-w-xs">
        <span className="text-[10px] tracking-[0.3em] text-amber-400 uppercase font-bold flex items-center gap-1.5">
          <Film className="w-3.5 h-3.5 text-amber-300 animate-pulse" /> PLAYING OFFICIAL FILM
        </span>
        <span className="text-sm font-serif font-bold tracking-wide text-stone-100">
          Pure Luxury • Emerald Gown & Gold Pinstripe Suit
        </span>
        <span className="text-[10px] text-stone-400 uppercase tracking-widest mt-0.5">
          "Define Your Own Style"
        </span>
      </div>

      {/* Hero Content Overlay with Grand Visual Scaling */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center">
        {/* Brand Crest Logo Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-24 h-24 sm:w-32 sm:h-32 mb-6 rounded-full border-2 border-amber-300/80 p-1.5 bg-white/95 backdrop-blur-md shadow-2xl overflow-hidden group hover:scale-105 transition-transform"
        >
          <img
            src={logoImg}
            alt="Mujtaba Designer Gold Monogram Crest"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-bold tracking-[0.35em] uppercase mb-5 shadow-xl"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          ROYAL BRIDAL & SHERWANI COLLECTION 2026
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.h1 className="font-ethnocentric text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-normal tracking-[0.15em] uppercase leading-none text-white drop-shadow-2xl">
            MUJTABA DESIGNER
          </motion.h1>
          <p className="text-sm sm:text-base uppercase tracking-[0.55em] text-white font-semibold">
            HAUTE COUTURE
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-3xl text-stone-200 text-sm sm:text-base md:text-lg font-light tracking-wider leading-relaxed mt-6 drop-shadow-md"
        >
          Unrivalled craftsmanship meets modern royal aesthetics. Explore hand-worked zardozi
          sherwanis, regal emerald velvet gowns, and bespoke gold-pinstripe tailoring.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-10"
        >
          <button
            onClick={() => onExploreClick('COUTURE')}
            className="px-10 py-4 sm:py-5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm tracking-[0.3em] uppercase transition-all shadow-2xl hover:scale-105 flex items-center gap-3 group cursor-pointer border border-amber-300 rounded-xl"
          >
            BRIDAL COUTURE
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onExploreClick('COUTURE')}
            className="px-10 py-4 sm:py-5 bg-slate-950/80 hover:bg-slate-900 text-white border border-amber-400/40 backdrop-blur-md font-bold text-xs sm:text-sm tracking-[0.3em] uppercase rounded-xl transition-all cursor-pointer shadow-xl hover:scale-105"
          >
            EXPLORE COUTURE
          </button>

          <button
            onClick={onOpenLocation}
            className="px-8 py-4 sm:py-5 bg-white hover:bg-stone-100 text-slate-950 border border-white font-bold text-xs sm:text-sm tracking-[0.25em] uppercase rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-xl hover:scale-105"
          >
            <MapPin className="w-4 h-4 text-amber-700" />
            STORE PICKUP
          </button>
        </motion.div>
      </div>

      {/* Bottom Subtle Gradient Bar */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-stone-50 to-transparent z-10 pointer-events-none" />
    </section>
  );
};
