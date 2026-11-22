import { Download } from "lucide-react";

export default function DownloadAppButton() {
  return (
    <a
      href="https://pathashala-ai-download.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:scale-95"
    >
      <Download size={18} />
      Download App
    </a>
  );
}
