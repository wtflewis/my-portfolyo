import { useState, useEffect } from "react";
import useSWR from "swr";

export default function StatusCard() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: discordData } = useSWR("/api/discord/status", fetcher, {
    refreshInterval: 10000, // Her 10 saniyede bir güncelle
  });

  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      setLocalTime(`${hours}:${minutes}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Discord durumuna göre status belirle
  const getStatus = () => {
    if (!discordData) {
      return {
        status: "online",
        text: "Aktif",
        color: "bg-emerald-500",
      };
    }

    // Discord'dan gelen duruma göre
    if (discordData.status === "online") {
      return { status: "online", text: "Çevrimiçi", color: "bg-emerald-500" };
    } else if (discordData.status === "idle") {
      return { status: "idle", text: "Boşta", color: "bg-amber-500" };
    } else if (discordData.status === "dnd") {
      return { status: "dnd", text: "Rahatsız Etmeyin", color: "bg-rose-500" };
    } else {
      return { status: "offline", text: "Çevrimdışı", color: "bg-slate-400" };
    }
  };

  const currentStatus = getStatus();

  return (
    <div className="inline-flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-slate-200/60 dark:border-white/8">
      {/* Status indicator */}
      <div className="flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.color} opacity-75`}
          ></span>
          <span
            className={`relative inline-flex rounded-full h-3 w-3 ${currentStatus.color}`}
          ></span>
        </span>
        <span className="text-xs font-medium text-slate-700 dark:text-white/80">
          {currentStatus.text}
        </span>
      </div>

      {/* Local time */}
      <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-white/60 border-l border-slate-300 dark:border-white/10 pl-3">
        <svg
          className="w-3 h-3"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-mono font-semibold">{localTime}</span>
      </div>
    </div>
  );
}
