import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LEXGUARD — AI Rights & Contract Intelligence System",
  description: "Upload contracts, offer letters, privacy policies, and any legal documents. LEXGUARD instantly detects exploitative clauses, hidden liabilities, financial risks, and privacy concerns — explained in simple human language.",
  keywords: "AI contract analysis, legal document review, contract intelligence, risk detection, privacy policy analyzer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
