"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";

export default function SocialPostButton({ vehicleId }) {
  const [posting, setPosting] = useState(false);
  const [result, setResult] = useState(null);

  const handlePost = async () => {
    if (posting) return;
    setPosting(true);
    setResult(null);

    try {
      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        throw new Error("Not logged in");
      }

      const res = await fetch("/api/trigger-post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ vehicleId }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");

      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        onClick={handlePost}
        disabled={posting}
        className="text-violet-400 hover:text-violet-300 transition-colors p-2 hover:bg-violet-500/10 rounded-lg disabled:opacity-50"
        title="Post to social media"
      >
        {posting ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : result ? (
          result.error ? (
            <AlertCircle className="w-4 h-4 text-red-400" />
          ) : (
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          )
        ) : (
          <Send className="w-4 h-4" />
        )}
      </button>
    </div>
  );
}
