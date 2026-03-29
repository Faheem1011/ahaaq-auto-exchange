"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import {
  CheckCircle,
  XCircle,
  Clock,
  Facebook,
  Instagram,
  RefreshCw,
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

function StatusBadge({ status }) {
  if (status === "success" || status)
    return (
      <span className="flex items-center gap-1 text-emerald-400">
        <CheckCircle size={14} />
      </span>
    );
  return (
    <span className="flex items-center gap-1 text-red-400">
      <XCircle size={14} />
    </span>
  );
}

export default function SocialPostHistory() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function fetchLogs() {
      const { data, error } = await supabase
        .from("social_post_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (!error && data) setLogs(data);
      setLoading(false);
    }

    fetchLogs();

    // Realtime subscription (FREE on Supabase)
    const channel = supabase
      .channel("social-logs")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "social_post_logs" },
        (payload) => {
          setLogs((prev) => [payload.new, ...prev].slice(0, 50));
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <RefreshCw className="animate-spin text-zinc-500" size={28} />
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className="text-center py-16">
        <Clock size={48} className="mx-auto text-zinc-700 mb-4" />
        <p className="text-zinc-500 text-lg font-medium">No posts yet</p>
        <p className="text-zinc-600 text-sm">
          Posts will appear here when vehicles are added or you publish manually.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {logs.map((log) => (
        <div
          key={log.id}
          className="bg-zinc-800/50 backdrop-blur border border-zinc-700/50 rounded-xl p-5 hover:border-zinc-600/50 transition-all group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                    log.event_type === "INSERT" || log.event_type === "MANUAL"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : log.event_type === "DELETE"
                      ? "bg-red-500/10 text-red-400 border border-red-500/20"
                      : log.event_type === "MANUAL_COMPOSE"
                      ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {log.event_type}
                </span>
                <span className="text-zinc-500 text-xs">
                  {new Date(log.created_at).toLocaleString()}
                </span>
              </div>
              <p className="text-zinc-300 text-sm line-clamp-2 mb-3 font-mono">
                {log.caption}
              </p>
            </div>

            {/* Platform status indicators */}
            <div className="flex items-center gap-3 shrink-0">
              <div
                className="flex items-center gap-1"
                title={
                  log.facebook_post_id
                    ? `Posted: ${log.facebook_post_id}`
                    : log.facebook_error || "Not posted"
                }
              >
                <Facebook size={16} className="text-blue-400" />
                <StatusBadge status={log.facebook_post_id} />
              </div>
              <div
                className="flex items-center gap-1"
                title={
                  log.instagram_post_id
                    ? `Posted: ${log.instagram_post_id}`
                    : log.instagram_error || "Not posted"
                }
              >
                <Instagram size={16} className="text-pink-400" />
                <StatusBadge status={log.instagram_post_id} />
              </div>
              <div
                className="flex items-center gap-1"
                title={
                  log.tiktok_post_id
                    ? `Posted: ${log.tiktok_post_id}`
                    : log.tiktok_error || "Not posted"
                }
              >
                <TikTokIcon size={16} className="text-white" />
                <StatusBadge status={log.tiktok_post_id} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
