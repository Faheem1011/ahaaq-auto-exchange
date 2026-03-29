"use client";

import { useState, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  Upload,
  Send,
  Facebook,
  Instagram,
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
} from "lucide-react";

// TikTok icon SVG
const TikTokIcon = ({ size = 16, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2 6.34 6.34 0 009.49 21.5a6.34 6.34 0 006.34-6.34V8.71a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.14z" />
  </svg>
);

export default function ManualPostComposer() {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [platforms, setPlatforms] = useState({
    facebook: true,
    instagram: true,
    tiktok: true,
  });
  const [posting, setPosting] = useState(false);
  const [result, setResult] = useState(null);
  const fileRef = useRef();

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const togglePlatform = (platform) => {
    setPlatforms((prev) => ({ ...prev, [platform]: !prev[platform] }));
  };

  const handlePost = async () => {
    if (!caption.trim()) return alert("Please write a caption.");
    if (!imageFile) return alert("Please upload an image.");
    if (!platforms.facebook && !platforms.instagram && !platforms.tiktok)
      return alert("Select at least one platform.");

    setPosting(true);
    setResult(null);

    try {
      const supabase = createClient();

      // Upload image to Supabase Storage (FREE)
      const fileName = `manual/${Date.now()}_${imageFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from("vehicle-images")
        .upload(fileName, imageFile, { cacheControl: "3600", upsert: false });

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      // Get public URL
      const {
        data: { publicUrl },
      } = supabase.storage.from("vehicle-images").getPublicUrl(fileName);

      // Get session token for auth
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Not logged in. Please sign in first.");
      }

      // Call our manual-post API
      const res = await fetch("/api/manual-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          caption: caption.trim(),
          imageUrl: publicUrl,
          platforms,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Post failed");

      setResult(data);
      setCaption("");
      removeImage();
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Caption Area */}
      <div>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
          Caption
        </label>
        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          rows={5}
          maxLength={2200}
          placeholder="Write your post caption here... Use emojis and hashtags! 🚗✨"
          className="w-full bg-zinc-800/50 border border-zinc-700/50 rounded-xl px-4 py-3 text-white placeholder-zinc-600 outline-none focus:border-zinc-500 transition-colors resize-none font-mono text-sm"
        />
        <p className="text-zinc-600 text-xs mt-1 text-right">
          {caption.length} / 2,200
        </p>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
          Image
        </label>
        {imagePreview ? (
          <div className="relative w-full max-w-md">
            <img
              src={imagePreview}
              alt="Preview"
              className="rounded-xl border border-zinc-700/50 w-full h-64 object-cover"
            />
            <button
              onClick={removeImage}
              className="absolute top-2 right-2 bg-zinc-900/90 border border-zinc-700 p-1.5 rounded-full hover:bg-red-500/20 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full max-w-md border-2 border-dashed border-zinc-700/50 rounded-xl p-12 flex flex-col items-center gap-3 text-zinc-500 hover:border-zinc-500 hover:text-zinc-400 transition-all cursor-pointer group"
          >
            <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-zinc-700 transition-colors">
              <Upload size={24} />
            </div>
            <span className="text-sm font-medium">
              Click to upload an image
            </span>
            <span className="text-xs text-zinc-600">
              JPG, PNG, or WebP up to 5 MB
            </span>
          </button>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </div>

      {/* Platform Selection */}
      <div>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-3">
          Publish To
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => togglePlatform("facebook")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm transition-all ${
              platforms.facebook
                ? "bg-blue-500/10 border-blue-500/30 text-blue-400"
                : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
            }`}
          >
            <Facebook size={18} />
            Facebook
          </button>
          <button
            onClick={() => togglePlatform("instagram")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm transition-all ${
              platforms.instagram
                ? "bg-pink-500/10 border-pink-500/30 text-pink-400"
                : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
            }`}
          >
            <Instagram size={18} />
            Instagram
          </button>
          <button
            onClick={() => togglePlatform("tiktok")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl border font-medium text-sm transition-all ${
              platforms.tiktok
                ? "bg-white/10 border-white/20 text-white"
                : "bg-zinc-800/50 border-zinc-700/50 text-zinc-500 hover:border-zinc-600"
            }`}
          >
            <TikTokIcon size={18} />
            TikTok
          </button>
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handlePost}
        disabled={posting || !caption.trim() || !imageFile}
        className="w-full bg-gradient-to-r from-zinc-100 to-white text-zinc-900 py-4 rounded-xl font-bold tracking-widest uppercase text-sm hover:from-white hover:to-zinc-100 transition-all shadow-lg shadow-white/5 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {posting ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Publishing...
          </>
        ) : (
          <>
            <Send size={18} />
            Publish Post
          </>
        )}
      </button>

      {/* Result Feedback */}
      {result && (
        <div
          className={`rounded-xl border p-5 ${
            result.error
              ? "bg-red-500/5 border-red-500/20"
              : "bg-emerald-500/5 border-emerald-500/20"
          }`}
        >
          {result.error ? (
            <div className="flex items-center gap-3 text-red-400">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{result.error}</span>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 mb-3">
                <CheckCircle size={20} />
                <span className="font-bold text-sm">Published!</span>
              </div>
              <div className="flex gap-4 text-sm">
                {result.facebook && (
                  <span
                    className={`flex items-center gap-1 ${
                      result.facebook === "success"
                        ? "text-emerald-400"
                        : result.facebook === "skipped"
                        ? "text-zinc-500"
                        : "text-red-400"
                    }`}
                  >
                    <Facebook size={14} /> {result.facebook}
                  </span>
                )}
                {result.instagram && (
                  <span
                    className={`flex items-center gap-1 ${
                      result.instagram === "success"
                        ? "text-emerald-400"
                        : result.instagram === "skipped"
                        ? "text-zinc-500"
                        : "text-red-400"
                    }`}
                  >
                    <Instagram size={14} /> {result.instagram}
                  </span>
                )}
                {result.tiktok && (
                  <span
                    className={`flex items-center gap-1 ${
                      result.tiktok === "success"
                        ? "text-emerald-400"
                        : result.tiktok === "skipped"
                        ? "text-zinc-500"
                        : "text-red-400"
                    }`}
                  >
                    <TikTokIcon size={14} /> {result.tiktok}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
