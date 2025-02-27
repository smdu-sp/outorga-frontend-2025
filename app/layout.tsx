import type { Metadata } from "next";
// import { Lato } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/providers/AuthProvider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";

// const lato = Lato({
//   subsets: ["latin"],
//   weight: ["100", "300", "400", "700", "900"],
//   display: "swap",
//   adjustFontFallback: false,
// });

export const metadata: Metadata = {
  title: "SISPEUC - Consulta de Processos",
  description: "Consulta de processos gerais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`antialised`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
