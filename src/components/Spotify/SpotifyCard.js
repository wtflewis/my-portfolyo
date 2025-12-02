import React from "react";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";
import { Play, Pause, ExternalLink, User } from "lucide-react";



export default function SpotifyCard({ api = "/api/spotify/spotifyCard" }) {
    const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data } = useSWR('/api/spotify/spotifyCard', fetcher);
    const albumImage = data?.albumImageUrl || "/spotify-placeholder.png";
    const title = data?.title || "No song playing";
    const artist = data?.artist || "Unknown artist";
    const album = data?.album || "Unknown album";
const isPlaying = data?.isPlaying ?? false;
    const trackUrl = data?.songUrl || "#";


  return (
        <div className="w-full max-w-sm bg-gradient-to-r from-pink-50/60 via-pink-100/40 to-white/10 dark:from-pink-900/25 dark:via-pink-900/15 dark:to-gray-900/40 backdrop-blur-md rounded-2xl p-4 shadow-md border border-pink-200/20">
            <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-pink-200/30">
                    <Image src={albumImage} alt="album" width={64} height={64} className="object-cover" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">{title}</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-300 truncate">{artist}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate italic">{album}</p>
                        </div>

                        <div className="flex flex-col items-end">
                            <span
                                className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                                    isPlaying
                                        ? "bg-pink-100/80 text-pink-800 ring-1 ring-pink-100/30"
                                        : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200"
                                }`}
                            >
                                {isPlaying ? "Oynatılıyor" : "Duraklatıldı"}
                            </span>
                         
                        </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                        <Link
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-pink-50 text-pink-600 text-xs rounded-full hover:bg-pink-100 transition-colors"
                            href={`https://open.spotify.com/track/${trackUrl.split("/track/")[1]}`}
                            aria-label="Open track in Spotify"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                         
                         Spotify'da aç
                            
                        </Link>

                        <button
                            type="button"
                            className="ml-1 inline-flex items-center gap-2 px-3 py-1.5 bg-white/60 dark:bg-white/5 text-xs rounded-full border border-white/5 hover:bg-white/70 dark:hover:bg-white/10 transition"
                            aria-label="View profile"
                        >
                            <User className="w-3.5 h-3.5" />
                            Profil
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
} 

