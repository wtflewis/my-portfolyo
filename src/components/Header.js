import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Github, Linkedin, Instagram, Send, Headphones, Music2 } from "lucide-react";
import useSWR from "swr";
import Card from "@/components/ui/Card";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});


export default function Header() {
    const [displayText, setDisplayText] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const fullText = "Full-stack developer.";
    
    useEffect(() => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                setIsTyping(false);
                clearInterval(typingInterval);
            }
        }, 100);
        return () => clearInterval(typingInterval);
    }, []);

     const fetcher = (url) => fetch(url).then((r) => r.json());
    const { data } = useSWR('/api/spotify/spotifyCard', fetcher);

    const [isContactOpen, setIsContactOpen] = useState(false);

    const isPlaying = data?.isPlaying ?? false;
    return (
        <>
            <main id="hero" className={`${geistSans.variable} ${geistMono.variable} p-6 pb-0`}>
                <div className="max-w-[420px] w-full mx-auto flex flex-col gap-4">
                <Card className="p-6 text-center text-slate-900 dark:text-white/90">
                    {/* Yuvarlak profil resmi için sarmalayıcı */}
                    <div className="relative w-[100px] h-[100px] rounded-full overflow-hidden mx-auto ring-1 ring-white/60 shadow-sm">
                        {/* Skeleton arka plan — resim yüklenene kadar görünecek */}
                        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-700 animate-pulse" aria-hidden="true" />
                        <Image
                            src="/aligirisen2.jpeg"
                            alt="Profile Picture"
                            fill
                            className="object-cover relative"
                            priority
                        />
                    </div>

                    <h2 className="mt-4 text-lg font-bold font-sans text-slate-900 dark:text-white">
                        M. Ali Girişen
                    </h2>

                    <p className="mt-2 text-sm font-mono font-bold text-slate-700 dark:text-white/90">
                        {displayText}
                        <span className={`inline-block w-0.5 h-4 bg-sky-500 ml-0.5 align-middle ${isTyping ? 'animate-pulse' : 'opacity-0'}`} />
                        <br />Dijital yazılım çözümleri üreticisi.
                    </p>
                </Card>

                {isPlaying && (
                    <Card className="relative overflow-hidden p-0 text-slate-900 dark:text-white/90">
                      {/* Gradient overlay bg */}
                      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-sky-500/5 to-purple-500/5 dark:from-emerald-500/10 dark:via-sky-500/10 dark:to-purple-500/10" />
                      
                      <div className="relative flex items-center gap-3 p-3.5">
                        {/* Album art */}
                        <div className="relative flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden ring-1 ring-white/20 shadow-md bg-slate-200 dark:bg-slate-700">
                          {/* Skeleton background */}
                          <div className="absolute inset-0 bg-gradient-to-br from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse" />
                          <Image
                            src={data?.albumImageUrl || "/spotify-placeholder.png"}
                            alt="Album"
                            fill
                            className="object-cover relative z-10"
                          />
                          {/* Play indicator overlay */}
                          <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/40 to-transparent flex items-end justify-center pb-1">
                            <Music2 size={12} className="text-white animate-pulse" />
                          </div>
                        </div>

                        {/* Song info */}
                        <div className="flex-1 min-w-0 pr-8">
                          <p className="text-[13px] font-semibold text-slate-800 dark:text-white/95 truncate leading-tight">
                            {data?.title || "Şarkı çalınıyor"}
                          </p>
                          <p className="text-[12px] text-slate-600 dark:text-white/70 truncate mt-0.5">
                            {data?.artist || "Spotify"}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1.5">
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-medium flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              Çalıyor
                            </span>
                          </div>
                        </div>

                        {/* Headphones icon - top right corner */}
                        <div className="absolute top-2 right-2 w-8 h-8 opacity-80">
                          <Headphones className="w-full h-full text-emerald-600 dark:text-emerald-400 drop-shadow-md" strokeWidth={2.5} />
                        </div>

                        {/* Listen button */}
                        <Link
                          href={data?.songUrl || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 right-3 text-[11px] px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-sky-500 text-white hover:from-emerald-600 hover:to-sky-600 transition font-semibold shadow-sm"
                        >
                          Aç
                        </Link>
                      </div>
                    </Card>
                )}
                </div>

            </main>
            {/*}
            <ContactModal open={isContactOpen} onClose={() => setIsContactOpen(false)} />
       */}
            </>
    );
}
