import React from "react";
import Link from "next/link";
import { Code2, Sparkles, Briefcase, ExternalLink, Folder, Star, GitFork } from "lucide-react";
import Card from "@/components/ui/Card";
import useSWR from "swr";

export default function AboutCard() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data: repos, error } = useSWR("/api/github/repos", fetcher);

  return (
    <Card id="hakkimda" className="p-6 md:p-7 text-slate-900 dark:text-white/90 scroll-mt-20">
      <header className="flex items-center gap-2 mb-3">
        <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-sky-500/10 text-sky-700 dark:text-sky-300">
          <Sparkles size={18} />
        </div>
        <h3 className="m-0 text-lg font-semibold">Hakkımda</h3>
      </header>
      <p className="text-[15px] leading-6 text-slate-700 dark:text-white/80">
        Merhaba, ben <strong>Ali Girişen</strong>. Ürün odaklı <em>full‑stack</em> geliştiriciyim. Modern
        arayüzler, performanslı backend'ler ve ölçeklenebilir altyapılar üzerinde çalışıyorum.
      </p>

      <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] text-slate-700/90 dark:text-white/70">
        <li className="inline-flex items-center gap-2">
          <Code2 size={16} className="text-sky-600 dark:text-sky-300" />
          React / Next.js, Tailwind, TypeScript
        </li>
        <li className="inline-flex items-center gap-2">
          <Code2 size={16} className="text-sky-600 dark:text-sky-300" />
          Node.js, Express, Prisma
        </li>
        <li className="inline-flex items-center gap-2">
          <Briefcase size={16} className="text-sky-600 dark:text-sky-300" />
          SaaS & Dashboard tasarımları
        </li>
        <li className="inline-flex items-center gap-2">
          <Briefcase size={16} className="text-sky-600 dark:text-sky-300" />
          API & Webhook entegrasyonları
        </li>
      </ul>

      <div className="mt-6">
        <div className="flex items-center gap-2 mb-3">
          <Folder size={16} className="text-sky-600 dark:text-sky-300" />
          <h4 className="text-sm font-semibold text-slate-800 dark:text-white/90">GitHub Projelerim</h4>
        </div>
        
        {!repos && !error && (
          <div className="space-y-2.5">
            {[1, 2].map((i) => (
              <div key={i} className="rounded-lg border border-slate-200/60 dark:border-white/8 p-3 animate-pulse">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-4 text-sm text-slate-600 dark:text-white/60">
            Projeler yüklenirken hata oluştu
          </div>
        )}

        {repos && (
          <div className="space-y-2.5">
            {repos.map((repo) => (
              <Link 
                key={repo.id}
                href={repo.url} 
                target="_blank"
                className="group block rounded-lg border border-slate-200/60 dark:border-white/8 p-3 hover:bg-white/40 dark:hover:bg-white/5 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] font-medium text-slate-800 dark:text-white/90 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition">
                      {repo.name}
                    </p>
                    <p className="text-[13px] text-slate-600 dark:text-white/70 mt-0.5 line-clamp-1">
                      {repo.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-[12px] text-slate-500 dark:text-white/60">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star size={12} />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork size={12} />
                          {repo.forks}
                        </span>
                      )}
                    </div>
                  </div>
                  <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-600 dark:text-white/40 dark:group-hover:text-white/70 transition flex-shrink-0 mt-0.5" />
                </div>
              </Link>
            ))}
            
            <Link 
              href="https://github.com/wtflewis?tab=repositories" 
              target="_blank"
              className="block text-center py-2 text-sm text-sky-600 dark:text-sky-400 hover:text-sky-700 dark:hover:text-sky-300 font-medium transition"
            >
              Tüm projeleri gör →
            </Link>
          </div>
        )}
      </div>
    </Card>
  );
}
