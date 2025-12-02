import Image from "next/image";
import Head from "next/head";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";
import AboutCard from "@/components/AboutCard";
import ContactCard from "@/components/Contact/ContactCard";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({Component, pageProps}) {
 
  
  return (
    <>
      <Head>
        <title>Ali Girişen | Full-Stack Developer & Software Engineer</title>
        <meta name="description" content="Ali Girişen - Full-stack developer specializing in React, Next.js, Node.js, and modern web technologies. Based in Kayseri, Turkey. Building scalable web applications and digital solutions." />
        <meta name="keywords" content="Ali Girişen, Full Stack Developer, React Developer, Next.js, Node.js, Web Developer, Software Engineer, JavaScript, TypeScript, Kayseri Developer" />
        <meta name="author" content="Ali Girişen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://aligirisen.com" />
        <meta property="og:title" content="Ali Girişen | Full-Stack Developer" />
        <meta property="og:description" content="Full-stack developer specializing in React, Next.js, Node.js. Building scalable web applications." />
        <meta property="og:image" content="/sticker.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://aligirisen.com" />
        <meta name="twitter:title" content="Ali Girişen | Full-Stack Developer" />
        <meta name="twitter:description" content="Full-stack developer specializing in React, Next.js, Node.js." />
        <meta name="twitter:image" content="/sticker.png" />
        
        {/* Favicon */}
        <link rel="icon" type="image/x-icon" href="/sticker.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/sticker.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/sticker.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/sticker.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Theme Color */}
        <meta name="theme-color" content="#0ea5e9" />
      </Head>
      <Navbar />
     <Header />

     <main className="px-6 pb-16 mt-4">
        <div className="max-w-5xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <AboutCard />
          <ContactCard />
        </div>
     </main>
   </>
  );
}

