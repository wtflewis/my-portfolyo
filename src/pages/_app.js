import "@/styles/globals.css";
import { useRouter } from "next/router";
import AnimatedGridBackground from "@/components/AnimatedGridBackground";
import BackToTop from "@/components/BackToTop";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import toast from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [easterEggCount, setEasterEggCount] = useState(0);

  const handleDoubleClick = () => {
    const messages = [
      "🎨 Güzel tasarım değil mi?",
      "✨ Next.js ile yapıldı!",
      "🚀 Hızlı ve modern!",
      "💙 Tailwind CSS kullanıldı",
      "🎯 Responsive tasarım!",
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    toast.success(randomMessage, {
      duration: 2000,
      icon: "🎉",
      style: {
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff",
      },
    });
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      <Toaster position="bottom-right" />
      {/* Fullscreen subtle animated grid background */}
      <AnimatedGridBackground />
      {/* Foreground app content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <Component {...pageProps} />
      </div>
      <BackToTop />
    </div>
  );
}