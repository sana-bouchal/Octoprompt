import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OctoPrompt - Votre coach personnel pour des prompts IA parfaits",
  description: "Donnez des bras à vos idées. Analysez et améliorez vos prompts IA en temps réel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
