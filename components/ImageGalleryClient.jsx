"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function ImageGalleryClient({ images, title, videoUrl }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images?.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  // Close modal on Escape key, navigate on arrows
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, images]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; }
  }, [isOpen]);

  // Video helpers
  const isYouTube = videoUrl && (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be'));
  const isVimeo = videoUrl && videoUrl.includes('vimeo.com');

  const getEmbedUrl = (url) => {
    if (isYouTube) {
      const videoId = url.split('v=')[1] || url.split('youtu.be/')[1];
      const ampersandPosition = videoId?.indexOf('&');
      const cleanId = ampersandPosition !== -1 && ampersandPosition !== undefined ? videoId?.substring(0, ampersandPosition) : videoId;
      return `https://www.youtube.com/embed/${cleanId}`;
    }
    if (isVimeo) {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  return (
    <>
      <div className="space-y-8">
        {/* Video Player Section */}
        {videoUrl && (
          <div className="relative w-full aspect-[16/9] bg-zinc-950 rounded-[2rem] overflow-hidden shadow-2xl border border-zinc-200/50">
            {isYouTube || isVimeo ? (
              <iframe
                src={getEmbedUrl(videoUrl)}
                title="Vehicle Video"
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={videoUrl}
                controls
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            )}
          </div>
        )}

        {/* Gallery Grid */}
        {images && images.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((src, idx) => (
              <div 
                key={idx} 
                onClick={() => openLightbox(idx)}
                className="relative aspect-video rounded-xl overflow-hidden shadow border border-zinc-100 bg-zinc-100 cursor-pointer group"
              >
                <Image
                  src={src}
                  alt={`${title} Image ${idx + 1}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 33vw, 20vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-300">
                    <div className="p-2.5 bg-white/90 backdrop-blur-sm shadow-xl rounded-full text-zinc-900 border border-white/20">
                      <Maximize2 size={16} strokeWidth={2.5} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-zinc-950/95 backdrop-blur-2xl" onClick={() => setIsOpen(false)}>
          <button 
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            className="absolute top-6 right-6 p-3 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 focus:outline-none"
          >
            <X size={24} />
          </button>

          <button 
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 lg:left-8 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 hidden sm:block focus:outline-none"
          >
            <ChevronLeft size={32} />
          </button>

          <div className="relative w-full max-w-6xl h-[85vh] px-4 sm:px-16" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[currentIndex]}
              alt={`${title} Image Enlarged`}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 lg:right-8 p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-all z-50 hidden sm:block focus:outline-none"
          >
            <ChevronRight size={32} />
          </button>
          
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-black/80 backdrop-blur-md rounded-full text-white font-semibold text-xs tracking-[0.2em]">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
