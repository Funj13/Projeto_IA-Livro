import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EstudaIA — Leitor Inteligente de Livros",
  description:
    "Envie fotos das páginas do seu livro para gerar explicações em áudio/vídeo e quizzes de estudo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
