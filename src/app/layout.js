import { Inter } from "next/font/google";
import TanstackProvider from "../providers/TanstackProvider";
import './styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Crypto Explorer",
  description: "Portal to all cryptocurrencies"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
        <TanstackProvider>
          {children}
        </TanstackProvider>
      </body>
    </html>
  );
}
