"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  ShieldCheck,
  ShieldAlert,
  RefreshCw,
  Facebook,
  Instagram,
  Clock,
  Edit,
  Save,
  X,
} from "lucide-react";

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

const PLATFORM_CONFIG = {
  facebook: {
    label: "Facebook",
    icon: Facebook,
    color: "blue",
    bgActive: "bg-blue-500/10",
    borderActive: "border-blue-500/20",
    textActive: "text-blue-400",
    fields: [
      { id: "page_id", label: "Page ID", placeholder: "e.g. 1023456789" },
      { id: "access_token", label: "Page Access Token", placeholder: "EAA..." },
    ],
  },
  instagram: {
    label: "Instagram",
    icon: Instagram,
    color: "pink",
    bgActive: "bg-pink-500/10",
    borderActive: "border-pink-500/20",
    textActive: "text-pink-400",
    fields: [
      { id: "user_id", label: "IG User ID", placeholder: "e.g. 178414..." },
      { id: "access_token", label: "Access Token", placeholder: "EAA..." },
    ],
  },
  tiktok: {
    label: "TikTok",
    icon: TikTokIcon,
    color: "white",
    bgActive: "bg-white/5",
    borderActive: "border-white/10",
    textActive: "text-white",
    fields: [
      { id: "client_key", label: "Client Key", placeholder: "awx..." },
      { id: "access_token", label: "Access Token", placeholder: "act..." },
    ],
  },
};

function daysUntilExpiry(expiresAt) {
  if (!expiresAt) return null;
  const diff = new Date(expiresAt) - Date.now();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

function TokenCard({ platform, token, onSave }) {
  const config = PLATFORM_CONFIG[platform];
  const Icon = config.icon || ShieldAlert;
  
  const [isEditing, setIsEditing] = useState(!token);
  const [formData, setFormData] = useState({
    access_token: token?.access_token || "",
    ...JSON.parse(token?.refresh_token || "{}")
  });
  const [saving, setSaving] = useState(false);

  // Status calculations
  const days = daysUntilExpiry(token?.expires_at);
  const isHealthy = token && (days === null || days > 7);
  const isWarning = token && days !== null && days <= 7 && days > 0;
  const isExpired = token && days !== null && days <= 0;
  const isConfigured = !!token;

  const statusClass = isEditing
    ? "bg-zinc-900 border-zinc-700 shadow-xl scale-[1.02] z-10 relative" // Elevated when editing
    : !isConfigured
    ? "bg-zinc-900/30 border-zinc-800 opacity-60"
    : isExpired
    ? "bg-red-500/5 border-red-500/20"
    : isWarning
    ? "bg-amber-500/5 border-amber-500/20"
    : `${config.bgActive} ${config.borderActive}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Extract access_token from config to match API shape
    const { access_token, ...restConfig } = formData;
    
    await onSave(platform, access_token, restConfig);
    setSaving(false);
    setIsEditing(false);
  };

  return (
    <div className={`rounded-xl border p-5 transition-all duration-300 ${statusClass}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Icon size={22} className={isConfigured || isEditing ? config.textActive : "text-zinc-600"} />
          <span className={`font-bold text-sm ${isConfigured || isEditing ? config.textActive : "text-zinc-600"}`}>
            {config.label}
          </span>
        </div>
        
        {/* Top Right Icons */}
        {!isEditing && isConfigured && (
          <div className="flex items-center gap-3">
            {isExpired ? (
              <ShieldAlert size={18} className="text-red-400" />
            ) : isWarning ? (
              <ShieldAlert size={18} className="text-amber-400" />
            ) : (
              <ShieldCheck size={18} className="text-emerald-400" />
            )}
            <button onClick={() => setIsEditing(true)} className="text-zinc-400 hover:text-white transition-colors">
              <Edit size={16} />
            </button>
          </div>
        )}
        
        {!isEditing && !isConfigured && (
          <button 
            onClick={() => setIsEditing(true)}
            className="text-xs bg-zinc-800 hover:bg-zinc-700 text-white px-3 py-1 rounded-md transition-colors"
          >
            Configure
          </button>
        )}
        
        {isEditing && isConfigured && (
          <button onClick={() => setIsEditing(false)} className="text-zinc-400 hover:text-white transition-colors">
             <X size={18} />
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {config.fields.map((field) => (
            <div key={field.id} className="space-y-1">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider pl-1">
                {field.label}
              </label>
              <input
                type={field.id === "access_token" ? "password" : "text"}
                value={formData[field.id] || ""}
                onChange={(e) => setFormData({...formData, [field.id]: e.target.value})}
                placeholder={field.placeholder}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-700 focus:outline-none focus:border-zinc-500 transition-colors"
                required
              />
            </div>
          ))}
          <div className="pt-2">
            <button
              type="submit"
              disabled={saving}
              className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-colors ${
                saving ? "bg-zinc-700 text-zinc-400" : "bg-white text-black hover:bg-zinc-200"
              }`}
            >
              {saving ? <RefreshCw size={16} className="animate-spin" /> : <Save size={16} />}
              {saving ? "Saving..." : "Save Configuration"}
            </button>
          </div>
        </form>
      ) : (
        isConfigured ? (
          <div className="space-y-2 text-xs text-zinc-400 animate-in fade-in duration-300">
            {days !== null && (
              <div className="flex items-center gap-2">
                <Clock size={12} />
                <span>
                  {isExpired ? (
                    <span className="text-red-400 font-bold">Expired</span>
                  ) : (
                    <>
                      Expires in{" "}
                      <span className={`font-bold ${isWarning ? "text-amber-400" : "text-emerald-400"}`}>
                        {days} days
                      </span>
                    </>
                  )}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <RefreshCw size={12} />
              <span>
                Last updated: {token.updated_at ? new Date(token.updated_at).toLocaleDateString() : "Never"}
              </span>
            </div>
            <div className="mt-3 font-mono text-zinc-600 text-[10px] truncate bg-zinc-800/50 rounded px-2 py-1">
              {token.access_token ? `${token.access_token.slice(0, 12)}...${token.access_token.slice(-6)}` : "No token"}
            </div>
          </div>
        ) : (
          <p className="text-xs text-zinc-600 mt-2">
            API keys not configured. Click configure to add your tokens and enable auto-posting.
          </p>
        )
      )}
    </div>
  );
}

export default function TokenStatus() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetch_tokens() {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("social_tokens")
      .select("*")
      .order("platform");

    if (!error && data) setTokens(data);
    setLoading(false);
  }

  useEffect(() => {
    fetch_tokens();
  }, []);

  const handleSaveToken = async (platform, access_token, config) => {
    try {
      const res = await fetch("/api/social-tokens", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ platform, access_token, config }),
      });
      if (!res.ok) throw new Error("Failed to save tokens");
      // Refresh the list after saving
      await fetch_tokens();
    } catch (err) {
      console.error(err);
      alert("Error saving API keys.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16">
        <RefreshCw className="animate-spin text-zinc-500" size={28} />
      </div>
    );
  }

  const allPlatforms = Object.keys(PLATFORM_CONFIG);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {allPlatforms.map((platform) => {
          const token = tokens.find((t) => t.platform === platform);
          return (
             <TokenCard 
               key={platform} 
               platform={platform} 
               token={token} 
               onSave={handleSaveToken} 
             />
          );
        })}
      </div>

      <div className="bg-zinc-800/30 rounded-xl border border-zinc-700/30 p-4">
        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">
          Setup Instructions
        </h4>
        <p className="text-zinc-500 text-sm">
          Please refer to the <span className="text-zinc-300 font-mono">SOCIAL_SETUP.md</span> file in the root of this project for step-by-step instructions on generating these API keys for Facebook, Instagram, and TikTok securely for free.
        </p>
      </div>
    </div>
  );
}
