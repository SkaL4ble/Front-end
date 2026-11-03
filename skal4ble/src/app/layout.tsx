import type { Metadata } from "next";
import { Chakra_Petch, Sansation } from "next/font/google";
import MicroSlatsBackground from "../components/ui/background/MicroSlatsBackground";
import "./globals.css";

//? Configurando a Chakra Petch
const chakraPetch = Chakra_Petch({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra-petch",
});

//? Configurando a Sansation
const sansation = Sansation({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-sansation",
});

export const metadata: Metadata = {
  title: "SkaL4ble",
  description: "Aplicação Next.js", //* Mudar a descrição depois...
};

export default function RootLayout({children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="pt-BR" className={`${chakraPetch.variable} ${sansation.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sansation">
        <MicroSlatsBackground>
          {children}
        </MicroSlatsBackground>
      </body>
    </html>
  );
}