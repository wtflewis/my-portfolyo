import React, { useState } from "react";
import { Mail, MapPin, Send, Copy, Check, Github, Linkedin, Instagram } from "lucide-react";
import Link from "next/link";
import Card from "@/components/ui/Card";
import toast from "react-hot-toast";

export default function ContactCard() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("aligirisen@example.com");
    setCopied(true);
    toast.success("Email kopyalandı!", {
      duration: 2000,
      style: {
        background: "#0ea5e9",
        color: "#fff",
      },
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      href: "https://github.com/wtflewis",
      color: "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://www.linkedin.com/in/aligirisen/",
      color: "hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400",
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/aligirisennn",
      color: "hover:bg-pink-50 dark:hover:bg-pink-900/20 text-pink-600 dark:text-pink-400",
    },
  ];

  return (
    <Card id="iletisim" className="p-6 md:p-7 text-slate-900 dark:text-white/90 scroll-mt-20">
      <header className="flex items-center gap-2 mb-3">
        <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300">
          <Send size={18} />
        </div>
        <h3 className="m-0 text-lg font-semibold">İletişim</h3>
      </header>

      <div className="space-y-2 text-[15px] text-slate-700 dark:text-white/80 mb-4">
        <div className="inline-flex items-center gap-1.5">
          <Mail size={16} className="text-sky-700 dark:text-sky-300" />
          <span>aligirisen@example.com</span>
          <button
            onClick={copyEmail}
            className="p-1 rounded hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors"
            aria-label="Copy email"
          >
            {copied ? (
              <Check size={14} className="text-emerald-600 dark:text-emerald-400" />
            ) : (
              <Copy size={14} className="text-slate-500 dark:text-slate-400" />
            )}
          </button>
        </div>
        <p className="flex items-center gap-2">
          <MapPin size={16} className="text-sky-700 dark:text-sky-300" /> 
          Kayseri, Turkey
        </p>
      </div>

      <div className="mt-5">
        <h4 className="text-sm font-semibold text-slate-800 dark:text-white/90 mb-3">Sosyal Medya</h4>
        <div className="grid grid-cols-3 gap-2">
          {socialLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 p-3 rounded-lg border border-slate-200/60 dark:border-white/8 transition ${link.color}`}
            >
              <link.icon size={18} />
              <span className="text-sm font-medium">{link.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </Card>
  );
}
