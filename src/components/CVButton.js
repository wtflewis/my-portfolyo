import { Download } from "lucide-react";

export default function CVButton() {
  const handleDownload = () => {
    // CV dosyası public klasöründe olmalı
    const link = document.createElement("a");
    link.href = "/cv.pdf"; // public/cv.pdf
    link.download = "Ali_Girisen_CV.pdf";
    link.click();
  };

  return (
    <button
      onClick={handleDownload}
      className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <Download size={18} className="relative z-10" />
      <span className="relative z-10">CV İndir</span>
    </button>
  );
}
